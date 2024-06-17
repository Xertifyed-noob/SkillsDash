from app import create_app
from app.load_data import load_data

app = create_app()

@app.before_first_request
def initialize_database():
    with app.app_context():
        load_data()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

