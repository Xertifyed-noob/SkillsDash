import pandas as pd

# Function to sequentially process skills, tools and education level columns
def format_data(data, column_name):
    items_list = []
    # Sequentially iterate over the rows in the dataset
    for _, row in data.iterrows():
        job_title = row['Job Title']
        items = row[column_name]
        # If there are items under the columns
        if pd.notna(items):
            # Process each item (skill, tool, education level) individually
            items_split = items.split(',')
            for item in items_split:
                # Append the dictionary containing the job title and item pairing to item list
                items_list.append({'job_title': job_title, column_name.lower(): item.strip()})

    formatted_data = pd.DataFrame(items_list)
    # print(f"Formatted data for column {column_name}:\n", formatted_data.head(20)) [DEBUGGING]
    return formatted_data

# Function to sequentially process the field of study column
def format_field_of_study(data):
    fields_of_study_list = []

    for _, row in data.iterrows():
        job_title = row['Job Title']
        education_levels = row['Education Level']
        fields_of_study = row['Field of Study']

        # If there are items under both columns
        if pd.notna(education_levels) and pd.notna(fields_of_study):
            education_levels_split = education_levels.split(',')
            fields_of_study_split = fields_of_study.split(',')

            # Ensure every education level is paired with every field of study
            for education_level in education_levels_split:
                for field_of_study in fields_of_study_split:
                    fields_of_study_list.append({
                        'job_title': job_title,
                        'education_level': education_level.strip(),
                        'field_of_study': field_of_study.strip()
                    })  

    formatted_list = pd.DataFrame(fields_of_study_list)
    # print(f"Formatted data for column Field of Study:\n", formatted_list.head(20)) [DEBUGGING]
    return formatted_list

# Function to load dataset and then format the columns in the dataset 
def load_and_format_data(file_path):
    data = pd.read_csv(file_path)
    
    skills = format_data(data, 'Skills')
    tools = format_data(data, 'Tools')
    education_level = format_data(data, 'Education Level')
    field_of_study = format_field_of_study(data)
    
    return skills, tools, education_level, field_of_study