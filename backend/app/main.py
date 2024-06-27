from . import create_app
from .fill_tables import fill_tables
from .database import init_db

app = create_app()

# Activates application context and populates database 
def initialize_database(): 
    with app.app_context():
        init_db(app)
        fill_tables()

if __name__ == "__main__":
    initialize_database()
    app.run(host="0.0.0.0", port=8000, debug=True)

