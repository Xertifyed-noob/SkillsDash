from . import create_app
from .load_data import load_data

app = create_app()

# Activates application context and populates database before the handling of the first request
@app.before_request 
def initialize_database(): 
    with app.app_context(): 
        load_data()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

