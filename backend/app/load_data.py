import pandas as pd
from app.database import db
from app.models import Skill, Tool, Education


def load_data():
    data = pd.read_csv("../datasets/Transformed_data.csv")
    
    skills = data['Skills'].str.split(',').explode().str.strip().value_counts()
    tools = data['Tools'].str.split(',').explode().str.strip().value_counts()
    education = data['Education'].str.split(',').explode().str.strip().value_counts()

    for skill, count in skills.items():
        db.session.add(Skill(name=skill, count=count))
    for tool, count in tools.items():
        db.session.add(Tool(name=tool, count=count))
    for edu, count in education.items():
        db.session.add(Education(level=edu, count=count))

    db.session.commit()