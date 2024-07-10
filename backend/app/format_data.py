import pandas as pd

# Function to sequentially process skills, tools, education level, and field od study columns
def format_data(data, column_name):
    items_list = []
    # Sequentially iterate over the rows in the dataset
    for _, row in data.iterrows():
        job_title = row['Job Title']
        items = row[column_name]
        # If there are items under the columns
        if pd.notna(items):
            # Process each item (skill, tool, education level, field of study) individually
            items_split = items.split(',')
            for item in items_split:
                # Append the dictionary containing the job title and item pairing to item list
                items_list.append({'job_title': job_title, column_name.lower(): item.strip()})

    formatted_data = pd.DataFrame(items_list)
    # print(f"Formatted data for column {column_name}:\n", formatted_data.head(10)) [DEBUGGING]
    return formatted_data

# Function to load dataset and then format the columns in the dataset 
def load_and_format_data(file_path):
    data = pd.read_csv(file_path)
    
    skills = format_data(data, 'Skills')
    tools = format_data(data, 'Tools')
    education_level = format_data(data, 'Education Level')
    field_of_study = format_data(data, 'Field of Study')
    
    return skills, tools, education_level, field_of_study