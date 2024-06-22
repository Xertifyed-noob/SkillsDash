from . import db

# Defining the schema of the relational database models
class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    count = db.Column(db.Integer, default=0)
    job_title = db.Column(db.String(80), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'count': self.count,
            'job_title': self.job_title
        }

class Tool(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    count = db.Column(db.Integer, default=0)
    job_title = db.Column(db.String(80), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'count': self.count,
            'job_title': self.job_title
        }

class Education(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.String(80), nullable=False)
    count = db.Column(db.Integer, default=0)
    job_title = db.Column(db.String(80), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'level': self.level,
            'count': self.count,
            'job_title': self.job_title
        }