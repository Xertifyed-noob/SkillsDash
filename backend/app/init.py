from flask import Flask
from .database import init_db
from .routes import main

def create_app():
    app = Flask(__name__) # Creates flask app
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../test.db'  # Sets the database URI to SQLite
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    init_db(app) # Initialise database
    app.register_blueprint(main)

    return app