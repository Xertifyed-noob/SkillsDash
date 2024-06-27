from . import db

# Defining the schema of the relational database models in MySQL
# Table of skills counts across job titles
class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skill = db.Column(db.String(80), nullable=False)
    count = db.Column(db.Integer, default=0)
    job_title = db.Column(db.String(80), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'skill': self.skill,
            'count': self.count,
            'job_title': self.job_title
        }

# Table of tools counts across job titles
class Tool(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tool = db.Column(db.String(80), nullable=False)
    count = db.Column(db.Integer, default=0)
    job_title = db.Column(db.String(80), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'tool': self.tool,
            'count': self.count,
            'job_title': self.job_title
        }

# Table of education level counts across job titles
class Education(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    education = db.Column(db.String(80), nullable=False)
    count = db.Column(db.Integer, default=0)
    job_title = db.Column(db.String(80), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'education': self.education,
            'count': self.count,
            'job_title': self.job_title
        }