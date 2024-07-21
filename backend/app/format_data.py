import pandas as pd

# Function to format the job title column
def format_job(data):
    jobs_list = []
    for idx, row in data.iterrows():
        job_title = row['Job Title']
        jobs_list.append({'job_title': job_title})
    formatted_data = pd.DataFrame(jobs_list)
    return formatted_data


# Function to sequentially process skills, tools (if jobs not None) and education level (if jobs = None) columns
def format_data(data, column_name, jobs=None):
    items_list = []

    # If processing skills and tools column
    if jobs is not None:
        # Create a mapper list that maps job titles to job ID
        mapper_list = [(row['job_title'], idx + 1) for idx, row in jobs.iterrows()]

    # Sequentially iterate over the rows in the dataset
    for idx, row in data.iterrows():
        job_title = row['Job Title']
        items = row[column_name]
        # If there are items under the columns
        if pd.notna(items):
            # Process each item (skill, tool, education level) individually
            items_split = items.split(',')
            # For every item, create a new dictionary to store attributes and then append the dictionary as a new row
            for item in items_split:
                item_dict = {
                    'job_title': job_title, 
                    column_name.lower(): item.strip()
                }
                if jobs is not None:
                    # Map job title to job title ID
                    item_dict['job_id'] = mapper_list[idx][1]
                items_list.append(item_dict)

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


# Function to format selected columns in the dataset 
def format_dataset(data):
    jobs = format_job(data)
    skills = format_data(data, 'Skills', jobs)
    tools = format_data(data, 'Tools', jobs)
    education_level = format_data(data, 'Education Level')
    field_of_study = format_field_of_study(data)
    
    return jobs, skills, tools, education_level, field_of_study