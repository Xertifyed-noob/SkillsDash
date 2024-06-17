from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    count = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'count': self.count
        }

class Tool(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    count = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'count': self.count
        }

class Education(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.String(80), nullable=False)
    count = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'level': self.level,
            'count': self.count
        }