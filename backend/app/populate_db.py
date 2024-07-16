import pandas as pd
from app import db
from app.models import Job, Skill, Tool, EducationLevel, FieldOfStudy
from .format_data import load_and_format_data
from sqlalchemy.sql import text

# Function to insert dataframes created in format_data.py into the MySQL database
def populate_db():
    jobs, skills, tools, education_level, field_of_study = load_and_format_data("../datasets/processed/Transformed_data.csv")

    # Clear existing data from MySQL tables (delete rows from dependent tables which has foreign keys first)
    db.session.query(FieldOfStudy).delete()
    db.session.query(Skill).delete()
    db.session.query(Tool).delete()
    db.session.query(EducationLevel).delete()
    db.session.query(Job).delete()

    # Reset index to start from 1 
    db.session.execute(text('ALTER TABLE job AUTO_INCREMENT = 1'))
    db.session.execute(text('ALTER TABLE skill AUTO_INCREMENT = 1'))
    db.session.execute(text('ALTER TABLE tool AUTO_INCREMENT = 1'))
    db.session.execute(text('ALTER TABLE education_level AUTO_INCREMENT = 1'))
    db.session.execute(text('ALTER TABLE field_of_study AUTO_INCREMENT = 1'))

    # Insert jobs into the job table
    jobs_list = jobs.to_dict(orient='records')
    db.session.bulk_insert_mappings(Job, jobs_list)

    # Convert skills dataframe into dictionary and then insert them into MySQL table
    skills_list = skills.rename(columns={'skills': 'skill'}).to_dict(orient='records')
    # print("Skills List Order Before Insertion:") [DEBUGGING]
    # print(skills_list[:10]) [DEBUGGING]
    db.session.bulk_insert_mappings(Skill, skills_list)

    # Convert tools dataframe into dictionary and then insert them into MySQL table
    tools_list = tools.rename(columns={'tools': 'tool'}).to_dict(orient='records')
    db.session.bulk_insert_mappings(Tool, tools_list)

    # Convert education level dataframe into dictionary and then insert them into MySQL table
    education_level_list = education_level.rename(columns={'education level': 'education_level'}).to_dict(orient='records')
    db.session.bulk_insert_mappings(EducationLevel, education_level_list)

    # Convert field of study dataframe into dictionary and then insert them into MySQL table
    field_of_study_df = populate_field_of_study(field_of_study) 
    field_of_study_list = field_of_study_df.to_dict(orient='records')
    db.session.bulk_insert_mappings(FieldOfStudy, field_of_study_list)

    db.session.commit()


# Function to map education level to education level id in field of study dataframe
def populate_field_of_study(field_of_study):
    # Load the original dataset, remove all columns but keep 'Educational Level' and 'Field of Study' columns
    data = pd.read_csv('../datasets/processed/Transformed_data.csv')
    df = data.copy()
    df = df[['Education Level', 'Field of Study']]
    # Remove rows with no items under 'Education Level' column 
    df = df.dropna(subset=['Education Level'])

    # Create a new 'Filled' column which indicates if the Field of Study column is filled or not
    df['Filled'] = df['Field of Study'].notna()
    df['Filled'] = df['Field of Study'].apply(lambda x: True if pd.notna(x) and len(str(x).strip()) > 0 else False)
    
    # Create a new 'Count' column which displays how many items are under the Field of Study column
    df['Field of Study'] = df['Field of Study'].fillna('')
    df['Count'] = df['Field of Study'].str.split(',').apply(len)

    # Transfrom the dataset and convert the 'Education Level; column as the rows of the transformed dataset
    df['Education Level'] = df['Education Level'].str.split(',')
    df = df.explode('Education Level').reset_index(drop=True)
    df['Education Level'] = df['Education Level'].str.strip()

    # Function to create a mapper list of tuples that maps every education level to an education level ID 
    def create_mapper(dataframe):
        mapper = []
        for idx, row in dataframe.iterrows():
            # If the 'Field of Study' column is not empty
            if row['Filled']:
                # We create the mapping tuple as many times as equals to the value of the 'Count' column
                for _ in range(row['Count']):
                    mapper.append((row['Education Level'], idx + 1))
        return mapper
    
    # Creates the mapper list from the transformed original dataset
    mapper_list = create_mapper(df)

    # Function to map education level to education level ID
    def map_education_level_to_id(field_of_study, mapper_list):
        mapper_iter = iter(mapper_list)
        # List of education level IDs that will be assigned to each row
        education_level_id = []
        for _, row in field_of_study.iterrows():
            # Retrieves the next mapping tuple from the iterator object and extracts the education level ID
            education_level = next(mapper_iter)
            education_level_id.append(education_level[1])
        # Replaces the education_level column with education_level_id data
        field_of_study['education_level'] = education_level_id
        return field_of_study
    
    # Maps and updates the field_of_study dataframe, and renames education_level to education_level_id
    field_of_study = map_education_level_to_id(field_of_study, mapper_list)
    field_of_study.rename(columns={'education_level': 'education_level_id'}, inplace=True)
    
    return field_of_study




