
import pandas as pd
from flask import Flask, jsonify, render_template

app = Flask(__name__, template_folder='index.html')



# Load CSV files into pandas dataframes
properties_df = pd.read_csv('Resources/property.csv')
restaurants_df = pd.read_csv('Resources/restaurants.csv')
groceries_df = pd.read_csv('Resources/groceries.csv')
publictransport_df=pd.read_csv('Resources/publictransports.csv')
schools_df= pd.read_csv('Resources/schools.csv')
gym_df=pd.read_csv('Resources/gyms.csv')
parks_df=pd.read_csv('Resources/parks.csv')

# Add more dataframes for other entities as needed

# Flask Routes
@app.route('/')
def index():
     return (
        "Available Routes:<br/>"
        "/api/v1.0/properties<br/>"
        "/api/v1.0/restaurants<br/>"
        "/api/v1.0/groceries<br/>"
        "/api/v1.0/publictransport<br/>"
        "/api/v1.0/schools<br/>"
        "/api/v1.0/gyms<br/>"
        "/api/v1.0/parks"
     )

# Routes to serve HTML templates
@app.route("/properties")
def properties_html():
    return render_template('index.html', data=properties_df.to_dict(orient='records'))

@app.route("/restaurants")
def restaurants_html():
    return render_template('index.html', data=restaurants_df.to_dict(orient='records'))

@app.route("/groceries")
def groceries_html():
    return render_template('index.html', data=groceries_df.to_dict(orient='records'))

@app.route("/publictransport")
def publictransport_html():
    return render_template('index.html', data=publictransport_df.to_dict(orient='records'))

@app.route("/school")
def school_html():
    return render_template('index.html', data=schools_df.to_dict(orient='records'))

@app.route("/gyms")
def gym_html():
    return render_template('index.html', data=gym_df.to_dict(orient='records'))

@app.route("/parks")
def parks_html():
    return render_template('index.html', data=parks_df.to_dict(orient='records'))

# Routes to serve JSON data
@app.route("/api/v1.0/properties")
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

@app.route("/api/v1.0/publictransport")
def get_publictransports():
    publictransport_data = publictransport_df.to_dict(orient='records')
    return jsonify(publictransport_data)

@app.route("/api/v1.0/schools")
def get_school():
    school_data = schools_df.to_dict(orient='records')
    return jsonify(school_data)

@app.route("/api/v1.0/gyms")
def get_gyms():
    gym_data = gym_df.to_dict(orient='records')
    return jsonify(gym_data)

@app.route("/api/v1.0/parks")
def get_parks():
   parks_data = parks_df.to_dict(orient='records')
   return jsonify(parks_data)
# Add similar routes for other entities...

if __name__ == '__main__':
    app.run(debug=True)
