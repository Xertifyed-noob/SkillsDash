from app import db
from app.models import Skill, Tool, Education
from .format_data import load_and_format_data
from sqlalchemy.sql import text

# For loading dataset into the MySQL database
def populate_db():
    skills, tools, education = load_and_format_data("../datasets/processed/Transformed_data.csv")

    # Clear existing data from MySQL tables
    db.session.query(Skill).delete()
    db.session.query(Tool).delete()
    db.session.query(Education).delete()

    # Reset index to start from 1 
    db.session.execute(text('ALTER TABLE skill AUTO_INCREMENT = 1'))
    db.session.execute(text('ALTER TABLE tool AUTO_INCREMENT = 1'))
    db.session.execute(text('ALTER TABLE education AUTO_INCREMENT = 1'))

    # Convert skills dataframe into dictionary and then insert them into MySQL table
    skills_list = skills.rename(columns={'skills': 'skill'}).to_dict(orient='records')
    # print("Skills List Order Before Insertion:") [DEBUGGING]
    # print(skills_list[:10]) [DEBUGGING]
    db.session.bulk_insert_mappings(Skill, skills_list)

    # Convert tools dataframe into dictionary and then insert them into MySQL table
    tools_list = tools.rename(columns={'tools': 'tool'}).to_dict(orient='records')
    db.session.bulk_insert_mappings(Tool, tools_list)

    # Convert education dataframe into dictionary and then insert them into MySQL table
    education_list = education.rename(columns={'education': 'education'}).to_dict(orient='records')
    db.session.bulk_insert_mappings(Education, education_list)

    db.session.commit()