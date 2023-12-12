import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

# Database Setup
engine = create_engine("postgresql://postgres:Grapefruit579@localhost:5433/housing_api")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
# Base.prepare(autoload_with=engine)

# Save reference to the table

property = Base.classes.property
restaurants = Base.classes.restaurants
grocery = Base.classes.grocery
publictransport = Base.classes.publictransport
schools = Base.classes.schools
gyms = Base.classes.gyms
parks = Base.classes.parks

# session = Session(conn)

# Flask Setup
app = Flask(__name__)


# Flask Routes
@app.route("/")
def welcome():
    """List all available API routes."""
    return ('index.html')
    # return (
    #     "Available Routes:<br/>"
    #     "/api/v1.0/properties<br/>"
    #     "/api/v1.0/restaurants<br/>"
    #     "/api/v1.0/groceries<br/>"
    #     "/api/v1.0/publictransport<br/>"
    #     "/api/v1.0/schools<br/>"
    #     "/api/v1.0/gyms<br/>"
    #     "/api/v1.0/parks"
    # )

@app.route("/api/v1.0/properties")
def properties():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all property data"""
    # Query all properties
    results = session.query(property.property_id, property.city, property.state, property.zipcode, property.address, property.price, property.bedrooms, property.bathrooms, property.square_foot, property.latitude, property.longitude, property.sale_amount, property.sale_transction_date).all()

    session.close()

    # Create a list of dictionaries from the row data
    all_properties = []
    for prop in results:
        property_dict = {
            "property_id": prop[0],
            "city": prop[1],
            "state": prop[2],
            "zipcode": prop[3],
            "address": prop[4],
            "price": prop[5],
            "bedrooms": prop[6],
            "bathrooms": prop[7],
            "square_foot": prop[8],
            "latitude": prop[9],
            "longitude": prop[10],
            "sale_amount": prop[11],
            "sale_transaction_date":prop[12]
        }
        all_properties.append(property_dict)

    return jsonify(all_properties)


# Similar routes for other tables (restaurants, groceries, publictransport, schools)...
@app.route("/api/v1.0/restaurants")
def restaurants():
    session= Session(engine)
    results= session.query(restaurants.rest_id, restaurants.rest_name, restaurants.rest_address, restaurants.rest_ratings, restaurants.latitude, restaurants.longitude).all()
    session.close()
    all_restaurants=[]
    for rest in results:
        restaurants_dict={
            "rest_id":rest[0],
            "rest_name":rest[1],
            "rest_address":rest[2],
            "rest_ratings": rest[3],
            "latitude":rest[4],
            "longitude":rest[5]
        }
        all_restaurants.append(restaurants_dict)
    return jsonify(all_restaurants)

@app.route("/api/v1.0/groceries")
def groceries():
    session= Session(engine)
    results= session.query(grocery.gro_id, grocery.gro_name, grocery.gro_address, grocery.gro_ratings, grocery.latitude, grocery.longitude).all()
    session.close()
    all_groceries=[]
    for gro in results:
        grocery_dict={
            "gro_id": gro[0],
            "gro_name": gro[1],
            "gro_address": gro[2],
            "gro_ratings":gro[3],
            "latitude":gro[4],
            "longitude":gro[5]
        }
        all_groceries.append(grocery_dict)
    return jsonify(all_groceries)

@app.route("/api/v1.0/publictransport")
def publictransport():
    session= Session(engine)
    results = session.query(publictransport.pub_id, publictransport.pub_name, publictransport.pub_address, publictransport.pub_ratings, publictransport.latitude, publictransport.longitude).all()
    session.close()
    all_publictransport=[]
    for pub in results:
        public_transport={
           "pub_id": pub[0],
           "pub_name":pub[1],
           "pub_address":pub[2],
           "pub_ratings":pub[3],
           "latitude":pub[4],
           "longitude":pub[5]
        }
        all_publictransport.append(public_transport)
    return jsonify(all_publictransport)

@app.route("/api/v1.0/schools")
def schools():
    session=Session(engine)
    results=session.query(schools.school_id, schools.school_name, schools.school_address, schools.school_ratings, schools.latitude, schools.longitude).all()
    session.close()
    all_school=[]
    for school in results:
        schools={
           "school_id": school[0],
           "school_name":school[1],
           "school_addresss":school[2],
           "school_ratings":school[3],
           "latitude":school[4],
           "longitude":school[5]
        }
        all_school.append(schools)
    return jsonify(all_school)

@app.route("/api/v1.0/gyms")
def gyms():
    session=Session(engine)
    results=session.query(gyms.gym_id, gyms.gym_name, gyms.gym_address,gyms.gym_ratings, gyms.latitude, gyms.longitude).all()
    session.close()
    all_gyms=[]
    for gyms in results:
        gyms={
           "gym_id": gyms[0],
           "gym_name":gyms[1],
           "gym_address":gyms[2],
           "gym_ratings":gyms[3],
           "latitude":gyms[4],
           "longitude":gyms[5]
        }
        all_gyms.append(gyms)
    return jsonify(all_gyms)

@app.route("/api/v1.0/parks")
def parks():
    session=Session(engine)
    results=session.query(parks.park_id, parks.park_name, parks.park_address, parks.park_ratings, parks.latitude, parks.longitude).all()
    session.close()
    all_parks=[]
    for parks in results:
        parks={
           "park_id": parks[0],
           "park_name":parks[1],
           "park_address":parks[2],
           "park_ratings":parks[3],
           "latitude":parks[4],
           "longitude":parks[5]
        }
        all_parks.append(parks)
    return jsonify(all_parks)

if __name__ == '__main__':
    app.run(debug=True)
