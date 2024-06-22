from . import db

# Initialising the database with respect to the application context and the schema from models.py
def init_db(app):
    db.create_all()