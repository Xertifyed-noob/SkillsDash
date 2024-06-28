import pandas as pd

def format_data(data, column_name):
    # Remove duplicates
    df = data[['Job Title', column_name]].dropna().copy()

    # Explode the column separately
    exploded = df[column_name].str.split(',').explode().str.strip().reset_index(drop=True)
    job_titles = df['Job Title'].repeat(df[column_name].str.split(',').apply(len)).reset_index(drop=True)

    # Create a new DataFrame with exploded data
    df_exploded = pd.DataFrame({'Job Title': job_titles, column_name: exploded})
    df_exploded = df_exploded.drop_duplicates(subset=['Job Title', column_name])

    return df_exploded

def load_and_format_data(file_path):
    data = pd.read_csv(file_path)
    
    skills = format_data(data, 'Skills')
    tools = format_data(data, 'Tools')
    education = format_data(data, 'Education')
    
    return skills, tools, education