from . import db

# Define the schema of the relational database models in MySQL
# Table to store skills data
class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skill = db.Column(db.String(100), nullable=False)
    job_title = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'skill': self.skill,
            'job_title': self.job_title
        }

# Table to store tools data
class Tool(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tool = db.Column(db.String(100), nullable=False)
    job_title = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'tool': self.tool,
            'job_title': self.job_title
        }

# Table to store education level data
class EducationLevel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    education_level = db.Column(db.String(100), nullable=False)
    job_title = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'education_level': self.education_level,
            'job_title': self.job_title
        }
    
# Table to store field of study data
class FieldOfStudy(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    field_of_study = db.Column(db.String(100), nullable=False)
    job_title = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'field_of_study': self.field_of_study,
            'job_title': self.job_title
        }