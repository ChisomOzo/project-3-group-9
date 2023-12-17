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
def get_parks():
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


@app.route('/schools', methods=['GET'])
def schools_property():
    try:
        schools = []
        with open('schools.csv', 'r') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                schools.append(row)
            return jsonify(schools)
    except FileNotFoundError:
        return jsonify({'error': 'parks data not found'}), 404
# -------------------------
if __name__ == '__main__':
    app.run(debug=True)
