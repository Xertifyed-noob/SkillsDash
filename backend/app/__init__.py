import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv

db = SQLAlchemy() # ORM for handling database operations
migrate = Migrate() # For handling database migrations like schema changes

def create_app():
    # Load environment variables from .env file
    load_dotenv() 
    
    # Create flask app
    app = Flask(__name__)
    # Set the database URI to MySQL
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{os.getenv('MYSQL_USERNAME')}:{os.getenv('MYSQL_PASSWORD')}@{os.getenv('MYSQL_HOST')}/{os.getenv('MYSQL_DB')}" 
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialise SQLAlchemy and Flask-Migrate object with flask app
    db.init_app(app) 
    migrate.init_app(app, db)  

    # Register main blueprint with flask app
    from .routes import main
    app.register_blueprint(main)

    return app

