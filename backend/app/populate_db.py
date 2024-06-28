from app import db
from app.models import Skill, Tool, Education
from .format_data import load_and_format_data

# For loading dataset into the MySQL database
def populate_db():
    skills, tools, education = load_and_format_data("../datasets/processed/Transformed_data.csv")
    # Insert Skills into DB
    for _, row in skills.iterrows():
        skill = Skill(job_title=row['Job Title'], skill=row['Skills'])
        db.session.add(skill)

    # Insert Tools into DB
    for _, row in tools.iterrows():
        tool = Tool(job_title=row['Job Title'], tool=row['Tools'])
        db.session.add(tool)

    # Insert Education into DB
    for _, row in education.iterrows():
        edu = Education(job_title=row['Job Title'], education=row['Education'])
        db.session.add(edu)

    db.session.commit()