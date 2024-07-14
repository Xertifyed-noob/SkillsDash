import pandas as pd
from app import db, create_app
from app.models import Skill, Tool, EducationLevel, FieldOfStudy

# Function to aggregate a given column (skill, tool, education_level) of a MySQL table
def aggregate_query(model, column, job_title=None):
    # Count the occurence of each unique item under the column
    query = db.session.query(column, db.func.count(column).label('count'))
    if job_title:
        query = query.filter(model.job_title == job_title)
    # Combine rows with the same item under the column
    query = query.group_by(column).all()
    return pd.DataFrame(query, columns=[column.name, 'count'])

def aggregate_field_of_study(job_title=None):
    query = db.session.query(
        EducationLevel.education_level,
        FieldOfStudy.field_of_study,
        db.func.count(FieldOfStudy.field_of_study).label('count')
    ).join(FieldOfStudy, EducationLevel.id == FieldOfStudy.education_level_id) 

    if job_title:
        query = query.filter(FieldOfStudy.job_title == job_title)

    query = query.group_by(EducationLevel.education_level, FieldOfStudy.field_of_study).all()
    return pd.DataFrame(query, columns=['education_level', 'field_of_study', 'count'])

# Function to count the total number of unique items under a given column
def count_distinct(model, column, job_title=None):
    query = db.session.query(column).distinct()
    if job_title:
        query = query.filter(model.job_title == job_title)
    return query.count()

# Function to aggregate counts as well as compute summary statistics
def aggregate_data(job_title=None, education_level=None):
    skill_counts = aggregate_query(Skill, Skill.skill, job_title)
    tool_counts = aggregate_query(Tool, Tool.tool, job_title)
    education_level_counts = aggregate_query(EducationLevel, EducationLevel.education_level, job_title)
    field_of_study_counts = aggregate_field_of_study(job_title)

    # To be changed 
    summary_stats = {
        'total_jobs': count_distinct(Skill, Skill.job_title, job_title),
        'total_skills': count_distinct(Skill, Skill.skill, job_title),
        'total_tools': count_distinct(Tool, Tool.tool, job_title),
        'total_education_levels': count_distinct(EducationLevel, EducationLevel.education_level, job_title),
        'total_fields_of_study': count_distinct(FieldOfStudy, FieldOfStudy.field_of_study, job_title),
    }

    return skill_counts, tool_counts, education_level_counts, field_of_study_counts, summary_stats

