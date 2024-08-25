import pandas as pd
from app import db
from app.models import Job, Industry, Skill, Tool, EducationLevel, FieldOfStudy

# Function to aggregate a given column (skill, tool, education_level) of a MySQL table
def aggregate_query(model, column, job_title=None, industry=None):
    # Count the occurence of each unique item under the given column
    query_columns = [column] + ([Industry.industry] if industry else []) + [db.func.count(column).label('count')]
    query = db.session.query(*query_columns)
    # Job title filtering 
    if job_title:
        # Joins Job table using the job_id foreign key to obtain mapped job titles
        query = query.join(Job, Job.id == model.job_id)
        query = query.filter(Job.job_title == job_title)
    # Filter out rows where the industry is "Unknown" if industry column is present
    if industry:
         # Joins Industry table using the industry_id foreign key to obtain mapped industries
        query = query.join(Industry, Industry.id == model.industry_id)
        query = query.filter(Industry.industry != "Unknown")
    # Combine rows with the same item under the given column, or combine rows with the same items under both the given column and industry column if present
    group_by_columns = [column] + ([Industry.industry] if industry else [])
    query = query.group_by(*group_by_columns).all()
    # Construct the dataframe of aggregated columns
    df_columns = [column.name] + ([Industry.industry.name] if industry else []) + ['count']
    return pd.DataFrame(query, columns=df_columns)


# Function to aggregate the field of study column separately
def aggregate_field_of_study(job_title=None):
    # Count the occurence of each unique field of study
    query = db.session.query(
        EducationLevel.education_level,
        FieldOfStudy.field_of_study,
        db.func.count(FieldOfStudy.field_of_study).label('count')
    # Joins FieldOfStudy table with EducationLevel table based on the condition that id of latter matches education_level_id of former
    ).join(FieldOfStudy, EducationLevel.id == FieldOfStudy.education_level_id) 
    # Job title filtering
    if job_title:
        query = query.join(Job, Job.id == FieldOfStudy.job_id)
        query = query.filter(Job.job_title == job_title)
    # Groups the counts first by education level, and then field of study
    query = query.group_by(EducationLevel.education_level, FieldOfStudy.field_of_study).all()
    return pd.DataFrame(query, columns=['education_level', 'field_of_study', 'count'])


def calculate_summary_stats(data):
    # Create a copy of the original data
    data = data.copy()

    # Calculate job listings and unique industries
    total_job_listings = len(data)
    # Total industries not including "Unknown"
    total_industries = data['Sector'].nunique() - 1

    # Replace 'Unknown' with NaN in 'Rating' and 'Salary' columns
    data.loc[data['Rating'] == 'Unknown', 'Rating'] = pd.NA
    data.loc[data['Salary'] == 'Unknown', 'Salary'] = pd.NA
    # Clean the 'Salary' column to remove currency symbols ('$') in front of the data
    data.loc[:, 'Salary'] = data['Salary'].replace({'\$': ''}, regex=True)
    # Convert 'Rating' and 'Salary' columns to numeric, converting errors to NaN
    data.loc[:, 'Rating'] = pd.to_numeric(data['Rating'], errors='coerce')
    data.loc[:, 'Salary'] = pd.to_numeric(data['Salary'], errors='coerce')
    # Calculate average rating and salary
    average_rating = data['Rating'].mean()
    average_salary = data['Salary'].mean()
    # Round rating and salary
    average_rating = round(average_rating, 1)
    average_salary = round(average_salary, 2)

    summary_stats = {
        'total_job_listings': total_job_listings,
        'total_industries': total_industries,
        'average_rating': average_rating,
        'average_salary': average_salary
    }

    return summary_stats


# Function to aggregate counts and compute summary statistics, with the main filtering logic
def aggregate_data(data, job_title=None):
    # Job title filtering
    if job_title:
        data = data[data['Job Title'] == job_title]

    skill_counts = aggregate_query(Skill, Skill.skill, job_title)
    tool_counts = aggregate_query(Tool, Tool.tool, job_title)
    education_level_counts = aggregate_query(EducationLevel, EducationLevel.education_level, job_title)
    field_of_study_counts = aggregate_field_of_study(job_title)
    summary_stats = calculate_summary_stats(data)

    return skill_counts, tool_counts, education_level_counts, field_of_study_counts, summary_stats

