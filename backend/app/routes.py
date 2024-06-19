from flask import Blueprint, jsonify, request
from .models import Skill, Tool, Education

main = Blueprint('main', __name__)

# Define view handlers to query records from the respective databases and return in JSON format
@main.route('/skills', methods=['GET'])
def get_skills():
    job_title = request.args.get('job_title')
    if job_title:
        skills = Skill.query.filter_by(job_title=job_title).all()
    else:
        skills = Skill.query.all()
    return jsonify([skill.to_dict() for skill in skills])

@main.route('/tools', methods=['GET'])
def get_tools():
    job_title = request.args.get('job_title')
    if job_title:
        tools = Tool.query.filter_by(job_title=job_title).all()
    else:
        tools = Tool.query.all()
    return jsonify([tool.to_dict() for tool in tools])


@main.route('/education', methods=['GET'])
def get_education():
    job_title = request.args.get('job_title')
    if job_title:
        education = Education.query.filter_by(job_title=job_title).all()
    else:
        education = Education.query.all()
    return jsonify([edu.to_dict() for edu in education])
