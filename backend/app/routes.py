from flask import Blueprint, jsonify, request, current_app
from .data_analysis import aggregate_data

# Creates 'main' blueprint for organising routes
main = Blueprint('main', __name__)

# Consolidated view handler to aggregate records and also filter the data if a job title is selected by JobFilter.js
@main.route('/api/data', methods=['GET'])
def get_filtered_data():
    job_title = request.args.get('job_title')
    data = current_app.config['DATA']
    skill_counts, tool_counts, education_level_counts, field_of_study_counts, summary_stats = aggregate_data(data, job_title)
    
    response = {
        'skills': skill_counts.to_dict(orient='records'),
        'tools': tool_counts.to_dict(orient='records'),
        'education_levels': education_level_counts.to_dict(orient='records'),
        'fields_of_study': field_of_study_counts.to_dict(orient='records'),
        'summaryStats': summary_stats
    }
    return jsonify(response)
