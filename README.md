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
- [ChangeLog](#ChangeLog)

## Project Overview
Welcome to the Housing Market Analysis Project! This comprehensive project offers insights into the housing market by analyzing housing prices, amenities, and surrounding features. Leveraging a Flask API to serve data to the frontend, the project's user interface is developed using HTML, CSS, and JavaScript. Rich data visualizations are integrated to highlight trends in housing prices and amenity patterns.

## Project Structure
The project is structured as follows:

- `flask_app.py`: Contains the Flask API implementation.
- `index.html`: For HTML templates.
- `logic.js`: For JavaScript.
- `properties_analysis`, `amenities_analysis`: Jupyter notebooks for data exploration and analysis.

## Getting Started
To run the project locally, follow these steps:

```bash
git clone https://github.com/ChisomOzo/project-3-group-9
cd project-3-group-9
pip install Flask pandas requests seaborn matplotlib numpy geopy
python flask_app.py
```

## Data Sources
The project utilizes data from the following sources:

- Real Estate listing APIs for housing market data.
- Mapping APIs for visualizing house locations.
- Databases for schools, grocery stores, and other amenities.

## Data Cleanup and Analysis
Data cleanup and analysis are performed in Jupyter notebooks 'properties_analysis' and 'amenities_analysis'. Explore, clean, and reformat data to prepare it for analysis. Detailed steps are documented in the notebooks.

## Flask API
The Flask API (`flask_apps.py`) serves as the backend for the project. It handles data retrieval and user-driven interactions. 

## Frontend Development
The frontend is built using HTML, and JavaScript. User-driven interactions are implemented using a JS library. 

## Data Visualization
Data visualizations are seamlessly integrated. These visualizations weave a compelling narrative about housing prices and amenity patterns. 

## Contributors
- Chisom Ozo
- Jorge Nardy
- Muhammad Kashif
- Omar Salloum 

## References
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Leaflet Documentation](https://leafletjs.com/)
- [Plotly Documentation](https://plotly.com/)
- [Jupyter Notebooks Documentation](https://jupyter.org/)
- [QuickDBD for Schema Design](https://www.quickdatabasediagrams.com/)
- [Yelp API](https://www.yelp.com/developers/documentation/v3)
- [ATTOM Real Estate API](https://api.developer.attomdata.com/docs)
## ChangeLog
- d3 java is mainly used.
- Use of chart.js for generating interactive bar charts.(New library Chart.js is used)
- improved CSS design
- added amenities which were having issues of loading.
- new flask routes and table information amended to fetch amenities data.
- flask Routes
- /properties
- /parks
- /gyms
- /restaurants
- /grocery
- /schools
