import os
from flask import Flask
from .database import init_db
from .routes import main
from dotenv import load_dotenv

def create_app():
    load_dotenv()  # Load environment variables from .env file
    
    app = Flask(__name__) # Creates flask app
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{os.getenv('MYSQL_USERNAME')}:{os.getenv('MYSQL_PASSWORD')}@{os.getenv('MYSQL_HOST')}/{os.getenv('MYSQL_DB')}" # Sets the database URI to MySQL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    init_db(app) # Initialise database
    app.register_blueprint(main)

    return app