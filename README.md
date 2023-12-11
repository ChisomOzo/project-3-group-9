# Housing Market Analysis Project

## Table of Contents
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Data Sources](#data-sources)
- [Data Cleanup and Analysis](#data-cleanup-and-analysis)
- [Flask API](#flask-api)
- [Frontend Development](#frontend-development)
- [Data Visualization](#data-visualization)
- [Contributors](#contributors)
- [References](#references)

## Project Overview
Welcome to the Housing Market Analysis Project! This project aims to provide insights into the housing market by analyzing housing prices, amenities, and surrounding features. The project utilizes a Flask API to serve data to the frontend, which is built using HTML, CSS, and JavaScript. The frontend incorporates data visualizations to showcase trends in housing prices and amenity patterns.

## Project Structure
The project is structured as follows:

- `flask_app.py`: Contains the Flask API implementation.
- `templates`: Directory for HTML templates.
- `static`: Directory for static files such as CSS and JavaScript.
- `data_analysis`: Jupyter notebooks for data exploration and analysis.

## Getting Started
To run the project locally, follow these steps:

```bash
git clone https://github.com/your-username/housing-market-analysis.git
cd housing-market-analysis
pip install -r requirements.txt
python flask_app.py
```

## Data Sources
The project utilizes data from the following sources:

- Real Estate listing APIs for housing market data.
- Mapping APIs for visualizing house locations.
- Databases for schools, grocery stores, and other amenities.

## Data Cleanup and Analysis
Data cleanup and analysis are performed in Jupyter notebooks located in the `data_analysis` directory. Explore, clean, and reformat data to prepare it for analysis. Detailed steps are documented in the notebooks.

- Data Analysis Notebook 1
- Data Analysis Notebook 2

## Flask API
The Flask API (`flask_app.py`) serves as the backend for the project. It handles data retrieval and user-driven interactions. API documentation can be found in the code comments.

## Frontend Development
The frontend is built using HTML, CSS, and JavaScript. User-driven interactions are implemented using a JS library. Explore the `templates` and `static` directories for frontend code.

## Data Visualization
Data visualizations are integrated using a library like Leaflet or Plotly. The visualizations tell a compelling story about housing prices and amenity patterns. Check the `static` directory for JavaScript files related to visualization.

## Contributors
- Names
- Names

## References
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Leaflet Documentation](https://leafletjs.com/)
- [Plotly Documentation](https://plotly.com/)
- [Jupyter Notebooks Documentation](https://jupyter.org/)
- [QuickDBD for Schema Design](https://www.quickdatabasediagrams.com/)
- [Yelp API](https://www.yelp.com/developers/documentation/v3)
- [ATTOM Real Estate API](https://api.developer.attomdata.com/docs)
