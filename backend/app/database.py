from . import db

# Initialising the database with respect to the application context and the schema from models.py
def init_db(app):
    with app.app_context():
        db.create_all()