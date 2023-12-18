from flask import Flask, jsonify, render_template,request
import json
import csv
from math import sqrt
import pandas as pd


app = Flask(__name__)
# 


# Serve the index.html file
@app.route('/')
def index():
    return render_template('index.html')

# Define the endpoint to serve property data
@app.route('/properties', methods=['GET'])
def get_properties():
    try:
        with open('property.json', 'r') as file:
            property = json.load(file)
            return jsonify(property)
    except FileNotFoundError:
        return jsonify({'error': 'Property data not found'}), 404
@app.route('/parks', methods=['GET'])
def parks():
    try:
        parks = []
        with open('parks.csv', 'r') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                parks.append(row)
            return jsonify(parks)
    except FileNotFoundError:
        return jsonify({'error': 'parks data not found'}), 404
# -------------------------
# Load property_parks.csv file

@app.route('/schools', methods=['GET'])
def schools():
    try:
        schools = []
        with open('schools.csv', 'r') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                schools.append(row)
            return jsonify(schools)
    except FileNotFoundError:
        return jsonify({'error': 'Schools data not found'}), 404
@app.route('/gyms', methods=['GET'])
def gyms():
    try:
        gyms = []
        with open('gyms.csv', 'r',encoding='utf-8') as dfile:
            csv_reader = csv.DictReader(dfile)
            for row1 in csv_reader:
                gyms.append(row1)
            return jsonify(gyms)
    except FileNotFoundError:
        return jsonify({'error': 'Gyms data not found'}), 404
@app.route('/restaurants', methods=['GET'])
def restaurants():
    try:
        restu = []
        with open('restaurants.csv', 'r',encoding='utf-8') as dfile:
            csv_reader = csv.DictReader(dfile)
            for row1 in csv_reader:
                restu.append(row1)
            return jsonify(restu)
    except FileNotFoundError:
        return jsonify({'error': 'Restaurant data not found'}), 404
@app.route('/grocery', methods=['GET'])
def groceries():
    try:
        grocery = []
        with open('groceries.csv', 'r',encoding='utf-8') as dfile:
            csv_reader = csv.DictReader(dfile)
            for row1 in csv_reader:
                grocery.append(row1)
            return jsonify(grocery)
    except FileNotFoundError:
        return jsonify({'error': 'Grocery data not found'}), 404
# -------------------------
if __name__ == '__main__':
    app.run(debug=True)
