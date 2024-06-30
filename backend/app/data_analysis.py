import pandas as pd
from app import db, create_app
from app.models import Skill, Tool, Education

# Function to aggregate a given column of a MySQL table
def aggregate_query(model, column, job_title=None):
    # Count the occurence of each unique item under the column
    query = db.session.query(column, db.func.count(column).label('count'))
    if job_title:
        query = query.filter(model.job_title == job_title)
    # Combine rows with the same item under the column
    query = query.group_by(column).all()
    return pd.DataFrame(query, columns=[column.name, 'count'])

# Function to count the total number of unique items under a given column
def count_distinct(model, column, job_title=None):
    query = db.session.query(column).distinct()
    if job_title:
        query = query.filter(model.job_title == job_title)
    return query.count()

# Function to aggregate counts as well as compute summary statistics
def aggregate_data(job_title=None):
    skill_counts = aggregate_query(Skill, Skill.skill, job_title)
    tool_counts = aggregate_query(Tool, Tool.tool, job_title)
    education_counts = aggregate_query(Education, Education.education, job_title)

    # To be changed 
    summary_stats = {
        'total_jobs': count_distinct(Skill, Skill.job_title, job_title),
        'total_skills': count_distinct(Skill, Skill.skill, job_title),
        'total_tools': count_distinct(Tool, Tool.tool, job_title),
        'total_education': count_distinct(Education, Education.education, job_title),
    }

    return skill_counts, tool_counts, education_counts, summary_stats

