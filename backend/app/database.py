from . import db

# Create all the unfilled tables in MySQL database with respect to the schema from models.py
def init_db(app):
    with app.app_context():
        db.create_all()