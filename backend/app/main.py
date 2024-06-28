from . import create_app
from .database import init_db
from .populate_db import populate_db

app = create_app()

# Activates application context and populates database 
def initialize_database(): 
    with app.app_context():
        init_db(app)
        populate_db()

if __name__ == "__main__":
    initialize_database()
    app.run(host="0.0.0.0", port=8000, debug=True)

