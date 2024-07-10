from . import create_app
from .database import init_db
from .populate_db import populate_db
from app.data_analysis import aggregate_data
from flask_cors import CORS

# Create and configure flask app
app = create_app()

# Enable CORS for all routes
CORS(app)

# Activate application context, initialise and populate MySQL database 
def initialize_database(): 
    with app.app_context():
        init_db(app)
        populate_db()
        skill_counts, tool_counts, education_level_counts, field_of_study_counts, summary_stats = aggregate_data()
        # print(skill_counts) [DEBUGGING]
        # print(tool_counts) [DEBUGGING]
        # print(education_counts) [DEBUGGING]
        # print(summary_stats) [DEBUGGING]


# Run flask app 
if __name__ == "__main__":
    initialize_database()
    app.run(host="0.0.0.0", port=8000, debug=True)

