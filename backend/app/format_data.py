import pandas as pd

# Function to format the job title column
def format_job(data):
    jobs_list = []
    for idx, row in data.iterrows():
        job_title = row['Job Title']
        jobs_list.append({'job_title': job_title})
    formatted_data = pd.DataFrame(jobs_list)
    return formatted_data


# Function to format the industry column
def format_industry(data):
    industry_list = []
    for idx, row in data.iterrows():
        industry = row['Sector']
        industry_list.append({'industry': industry})
    formatted_data = pd.DataFrame(industry_list)
    return formatted_data


# Function to sequentially process skills, tools (if industries not None) and education level (if industries = None) columns
def format_data(data, column_name, jobs, industries=None):
    items_list = []

    # Create a mapper list that maps job titles to job ID
    job_map = [(row['job_title'], idx + 1) for idx, row in jobs.iterrows()]

    # If processing skills and tools column (not education column)
    if industries is not None:
        # Create a mapper list that maps industries to industry ID
        industry_map = [(row['industry'], idx + 1) for idx, row in industries.iterrows()]

    # Sequentially iterate over the rows in the dataset
    for idx, row in data.iterrows():
        items = row[column_name]
        # If there are items under the columns
        if pd.notna(items):
            # Process each item (skill, tool, education level) individually
            items_split = items.split(',')
            # For every item, create a new dictionary to store attributes and then append the dictionary as a new row
            for item in items_split:
                item_dict = {
                    column_name.lower(): item.strip(),
                    'job_id': job_map[idx][1]
                }
                # If processing skills and tools column (not education column)
                if industries is not None:
                    # Add industry attribute to dictionary
                    item_dict['industry_id'] = industry_map[idx][1]
                items_list.append(item_dict)

    formatted_data = pd.DataFrame(items_list)
    # print(f"Formatted data for column {column_name}:\n", formatted_data.head(20)) [DEBUGGING]
    return formatted_data


# Function to sequentially process the field of study column
def format_field_of_study(data, jobs):
    fields_of_study_list = []

    # Create a mapper list that maps job titles to job ID
    job_map = [(row['job_title'], idx + 1) for idx, row in jobs.iterrows()]

    for idx, row in data.iterrows():
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
                        'education_level': education_level.strip(),
                        'field_of_study': field_of_study.strip(),
                        'job_id': job_map[idx][1]
                    })  

    formatted_list = pd.DataFrame(fields_of_study_list)
    # print(f"Formatted data for column Field of Study:\n", formatted_list.head(20)) [DEBUGGING]
    return formatted_list


# Function to format selected columns in the dataset 
def format_dataset(data):
    jobs = format_job(data)
    industries = format_industry(data)
    skills = format_data(data, 'Skills', jobs, industries)
    tools = format_data(data, 'Tools', jobs, industries)
    education_level = format_data(data, 'Education Level', jobs)
    field_of_study = format_field_of_study(data, jobs)
    
    return jobs, industries, skills, tools, education_level, field_of_study