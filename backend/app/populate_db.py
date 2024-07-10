from app import db
from app.models import Skill, Tool, EducationLevel, FieldOfStudy
from .format_data import load_and_format_data
from sqlalchemy.sql import text

# For loading dataset into the MySQL database
def populate_db():
    skills, tools, education_level, field_of_study = load_and_format_data("../datasets/processed/Transformed_data.csv")

    # Clear existing data from MySQL tables
    db.session.query(Skill).delete()
    db.session.query(Tool).delete()
    db.session.query(EducationLevel).delete()
    db.session.query(FieldOfStudy).delete()

    # Reset index to start from 1 
    db.session.execute(text('ALTER TABLE skill AUTO_INCREMENT = 1'))
    db.session.execute(text('ALTER TABLE tool AUTO_INCREMENT = 1'))
    db.session.execute(text('ALTER TABLE education_level AUTO_INCREMENT = 1'))
    db.session.execute(text('ALTER TABLE field_of_study AUTO_INCREMENT = 1'))

    # Convert skills dataframe into dictionary and then insert them into MySQL table
    skills_list = skills.rename(columns={'skills': 'skill'}).to_dict(orient='records')
    # print("Skills List Order Before Insertion:") 
    # print(skills_list[:10]) 
    db.session.bulk_insert_mappings(Skill, skills_list)

    # Convert tools dataframe into dictionary and then insert them into MySQL table
    tools_list = tools.rename(columns={'tools': 'tool'}).to_dict(orient='records')
    db.session.bulk_insert_mappings(Tool, tools_list)

    # Convert education level dataframe into dictionary and then insert them into MySQL table
    education_level_list = education_level.rename(columns={'education level': 'education_level'}).to_dict(orient='records')
    db.session.bulk_insert_mappings(EducationLevel, education_level_list)

    # Convert field of study dataframe into dictionary and then insert them into MySQL table
    field_of_study_list = field_of_study.rename(columns={'field of study': 'field_of_study'}).to_dict(orient='records')
    db.session.bulk_insert_mappings(FieldOfStudy, field_of_study_list)

    db.session.commit()