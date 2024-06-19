from flask import Blueprint, jsonify
from .models import Skill, Tool, Education

main = Blueprint('main', __name__)

# Define view handlers to query records from the respective databases and return in JSON format
@main.route('/skills', methods=['GET'])
def get_skills():
    skills = Skill.query.all()
    return jsonify([skill.to_dict() for skill in skills])

@main.route('/tools', methods=['GET'])
def get_tools():
    tools = Tool.query.all()
    return jsonify([tool.to_dict() for tool in tools])

@main.route('/education', methods=['GET'])
def get_education():
    education = Education.query.all()
    return jsonify([edu.to_dict() for edu in education])
