import pandas as pd
from app import db
from app.models import Skill, Tool, Education

def process_data(data, column_name):
    df = data[['Job Title', column_name]].dropna().copy()
    print("Step 1: Drop NaNs")
    print(df.head())

    # Explode the column separately
    exploded = df[column_name].str.split(',').explode().str.strip().reset_index(drop=True)
    job_titles = df['Job Title'].repeat(df[column_name].str.split(',').apply(len)).reset_index(drop=True)
    
    print("Step 2: Explode")
    print(exploded.head())
    print(job_titles.head())

    # Create a new DataFrame with exploded data
    df_exploded = pd.DataFrame({ 'Job Title': job_titles, column_name: exploded })
    df_exploded = df_exploded.drop_duplicates(subset=['Job Title', column_name])

    print("Step 3: Drop Duplicates")
    print(df_exploded.head())

    if df_exploded.index.has_duplicates:
        print("Warning: Duplicate indices found!")

    return df_exploded.groupby(['Job Title', column_name]).size().reset_index(name='Count')
 
# For loading dataset into the MySQL database
def fill_tables():
    data = pd.read_csv("../datasets/Transformed_data.csv")

    # Process each column and store the results
    skills = process_data(data, 'Skills')
    tools = process_data(data, 'Tools')
    education = process_data(data, 'Education')

    # Insert Skills into DB
    for _, row in skills.iterrows():
        skill = Skill(job_title=row['Job Title'], skill=row['Skills'], count=row['Count'])
        db.session.add(skill)

    # Insert Tools into DB
    for _, row in tools.iterrows():
        tool = Tool(job_title=row['Job Title'], tool=row['Tools'], count=row['Count'])
        db.session.add(tool)

    # Insert Education into DB
    for _, row in education.iterrows():
        edu = Education(job_title=row['Job Title'], education=row['Education'], count=row['Count'])
        db.session.add(edu)

    db.session.commit()