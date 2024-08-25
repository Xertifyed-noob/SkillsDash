from . import db

# Define the schema of the relational database models in MySQL

# Table to store job title mappings
class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_title = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'job_title': self.job_title,
        }
    
# Table to store industry mappings
class Industry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    industry = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'industry': self.industry,
        }

# Table to store skills data
class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skill = db.Column(db.String(100), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=False)
    industry_id = db.Column(db.Integer, db.ForeignKey('industry.id'), nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'skill': self.skill,
            'job_id': self.job_id,
            'industry_id': self.industry_id
        }

# Table to store tools data
class Tool(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tool = db.Column(db.String(100), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=False)
    industry_id = db.Column(db.Integer, db.ForeignKey('industry.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'tool': self.tool,
            'job_id': self.job_id,
            'industry_id': self.industry_id
        }

# Table to store education level data
class EducationLevel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    education_level = db.Column(db.String(100), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=False)
    fields_of_study = db.relationship('FieldOfStudy', backref='education_level', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'education_level': self.education_level,
            'job_id': self.job_id,
        }
    
# Table to store field of study data
class FieldOfStudy(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    field_of_study = db.Column(db.String(100), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=False)
    education_level_id = db.Column(db.Integer, db.ForeignKey('education_level.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'field_of_study': self.field_of_study,
            'job_id': self.job_id,
            'education_level_id': self.education_level_id
        }