import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv

# Initialize SQLAlchemy and Migrate
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    load_dotenv()  # Load environment variables from .env file
    
    app = Flask(__name__) # Creates flask app
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{os.getenv('MYSQL_USERNAME')}:{os.getenv('MYSQL_PASSWORD')}@{os.getenv('MYSQL_HOST')}/{os.getenv('MYSQL_DB')}" # Sets the database URI to MySQL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)  # Initialize SQLAlchemy with the app
    migrate.init_app(app, db)  # Initialize Flask-Migrate with the app and SQLAlchemy

    with app.app_context():
        from .database import init_db
        init_db(app) # Initialise database

    from .routes import main
    app.register_blueprint(main)

    return app

