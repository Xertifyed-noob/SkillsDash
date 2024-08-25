from flask import Blueprint, jsonify, request, current_app
from app.models import Industry, Skill, Tool
from .data_analysis import aggregate_query, aggregate_data

# Creates 'main' blueprint for organising routes
main = Blueprint('main', __name__)

# Consolidated API endpoint to aggregate records and also filter the data if a job title is selected by JobFilter.js
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

# API endpoint to fetch counts for a specific selected skill across industries
@main.route('/api/data/skill_industries', methods=['GET'])
def get_skill_industry_counts():
    # Extract skill string from the skill list (skill[]) that is sent from the frontend
    skill_list = request.args.getlist('skill[]')
    skill = skill_list[0] if skill_list else None
    job_title = request.args.get('job_title')
    # Return dataframe of all unique skill and industry counts
    counts = aggregate_query(Skill, Skill.skill, job_title, Industry.industry)
    # Filter dataframe to show only indsutry counts for the selected skill
    skill_industry_counts = counts[counts['skill'] == skill]
    return jsonify(skill_industry_counts.to_dict(orient='records'))

# API endpoint to fetch counts for a specific selected tool across industries
@main.route('/api/data/tool_industries', methods=['GET'])
def get_tool_industry_counts():
    # Extract tool string from the tool list (tool[]) that is sent from the frontend
    tool_list = request.args.getlist('tool[]')
    tool = tool_list[0] if tool_list else None
    job_title = request.args.get('job_title')
    # Return dataframe of all unique tool and industry counts
    counts = aggregate_query(Tool, Tool.tool, job_title, Industry.industry)
    # Filter dataframe to show only indsutry counts for the selected tool
    tool_industry_counts = counts[counts['tool'] == tool]
    return jsonify(tool_industry_counts.to_dict(orient='records'))
