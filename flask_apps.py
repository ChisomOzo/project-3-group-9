import pandas as pd
from flask import Flask, jsonify, render_template

app = Flask(__name__)

# Load CSV files into pandas dataframes
properties_df = pd.read_csv('Resources/parks.csv')
restaurants_df = pd.read_csv('Resources/restaurants.csv')
groceries_df = pd.read_csv('Resources/groceries.csv')
# Add more dataframes for other entities as needed

# Flask Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/v1.0/parks")
def get_properties():
    properties_data = properties_df.to_dict(orient='records')
    return jsonify(properties_data)

@app.route("/api/v1.0/restaurants")
def get_restaurants():
    restaurants_data = restaurants_df.to_dict(orient='records')
    return jsonify(restaurants_data)

@app.route("/api/v1.0/groceries")
def get_groceries():
    groceries_data = groceries_df.to_dict(orient='records')
    return jsonify(groceries_data)

# Add similar routes for other entities...

if __name__ == '__main__':
    app.run(debug=True)
