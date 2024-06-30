from flask import Blueprint, jsonify, request
from .data_analysis import aggregate_data

# Creates 'main' blueprint for organising routes
main = Blueprint('main', __name__)

DEFAULT_JOB_TITLE = 'Data Analyst'

# Define view handlers to aggregate records from the respective databases and return in JSON format
@main.route('/aggregated/skills', methods=['GET'])
def get_aggregated_skills():
    job_title = request.args.get('job_title', DEFAULT_JOB_TITLE)
    skill_counts, _, _, _ = aggregate_data(job_title)
    return jsonify(skill_counts.to_dict(orient='records'))

@main.route('/aggregated/tools', methods=['GET'])
def get_aggregated_tools():
    job_title = request.args.get('job_title', DEFAULT_JOB_TITLE)
    _, tool_counts, _, _ = aggregate_data(job_title)
    return jsonify(tool_counts.to_dict(orient='records'))


@main.route('/aggregated/education', methods=['GET'])
def get_aggregated_education():
    job_title = request.args.get('job_title', DEFAULT_JOB_TITLE)
    _, _, education_counts, _ = aggregate_data(job_title)
    return jsonify(education_counts.to_dict(orient='records'))

@main.route('/aggregated/summary', methods=['GET'])
def get_summary_stats():
    job_title = request.args.get('job_title', DEFAULT_JOB_TITLE)
    _, _, _, summary_stats = aggregate_data(job_title)
    return jsonify(summary_stats)
