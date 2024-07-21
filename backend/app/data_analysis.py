import pandas as pd
from app import db
from app.models import Skill, Tool, EducationLevel, FieldOfStudy

# Function to aggregate a given column (skill, tool, education_level) of a MySQL table
def aggregate_query(model, column):
    # Count the occurence of each unique item under the column
    query = db.session.query(column, db.func.count(column).label('count'))
    # Combine rows with the same item under the column
    query = query.group_by(column).all()
    return pd.DataFrame(query, columns=[column.name, 'count'])


# Function to further aggregate tool column to include the counts of their appearances alongside any of the top skills [Originally used for BubbleChart.js]
def aggregate_tools():
    top_skills = get_top_skills()
    # Aggregate the tool column and return a data frame of tool counts
    tool_counts = aggregate_query(Tool, Tool.tool)
    tool_counts['co_appearance'] = 0

    for tool in tool_counts['tool']:
        # Use a set to track job IDs that have already been counted for this tool
        counted_job_ids = set()
        for skill in top_skills:
            # Query to count the number of times the tool appears alongside the current skill (number of unique job IDs)
            query = db.session.query(Tool.job_id).join(Skill, Skill.job_id == Tool.job_id).filter(Tool.tool == tool, Skill.skill == skill)
            result = query.all()   
            # Ensures that each job ID is counted only once
            for row in result:
                counted_job_ids.add(row[0])
        # The size of the set is the number of unique job IDs where the tool co-appears with any of the top skills
        tool_counts.loc[tool_counts['tool'] == tool, 'co_appearance'] = len(counted_job_ids)

    return tool_counts


# Function to query the top 3 skills from the Skill table in MySQL database [Originally used for BubbleChart.js]
def get_top_skills(n=3):
    # Base query to count the occurence of each unique skill
    query = db.session.query(
        Skill.skill,
        db.func.count(Skill.skill).label('count')
    ).group_by(Skill.skill)
    # Sort in descending order and limit the query result to the top n skills with the most counts
    top_skills_query = query.order_by(db.desc('count')).limit(n).all()
    # Extract the skill names from the query result
    top_skills = [skill[0] for skill in top_skills_query]
    return top_skills


# Function to aggregate the field of study column separately
def aggregate_field_of_study():
    # Count the occurence of each unique field of study
    query = db.session.query(
        EducationLevel.education_level,
        FieldOfStudy.field_of_study,
        db.func.count(FieldOfStudy.field_of_study).label('count')
    # Joins FieldOfStudy table with EducationLevel table based on the condition that id of latter matches education_level_id of former
    ).join(FieldOfStudy, EducationLevel.id == FieldOfStudy.education_level_id) 
    # Groups the counts first by education level, and then field of study
    query = query.group_by(EducationLevel.education_level, FieldOfStudy.field_of_study).all()
    return pd.DataFrame(query, columns=['education_level', 'field_of_study', 'count'])


def calculate_summary_stats(data):
    # Create a copy of the original data
    data = data.copy()

    # Calculate job listings and unique industries
    total_job_listings = len(data)
    total_industries = data['Sector'].nunique()

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

    skill_counts = aggregate_query(Skill, Skill.skill)
    tool_counts = aggregate_tools()
    education_level_counts = aggregate_query(EducationLevel, EducationLevel.education_level)
    field_of_study_counts = aggregate_field_of_study()
    summary_stats = calculate_summary_stats(data)

    return skill_counts, tool_counts, education_level_counts, field_of_study_counts, summary_stats

