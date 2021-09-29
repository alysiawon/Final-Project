import pandas as pd
import json
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template
from flask_cors import CORS

# Set Up Database
host = "olympic-databases.cqg15afinz5u.us-east-2.rds.amazonaws.com"
engine = create_engine(f"postgresql://postgres:olympics@{host}:5432/olympic-databases")
connection = engine.connect()

# Set Up Flask
app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
   return render_template("index.html")

# Create Flask Routes
# Medals Data
@app.route("/api/v1.0/medals/<year>")
def medals(year):
    medalsquery = f"""
        SELECT year, country_name, country_code,latitude, longitude, gdp, population, gold_medals From medals
        WHERE year = {year}
        AND gold_medals >= 1
        ORDER BY gold_medals DESC"""
    # import SQL table as pandas dataframe
    medals_df = pd.read_sql(medalsquery, connection)

    medals_df['gdp'] = medals_df['gdp'].apply(lambda x: "${:,}".format(x))
    medals_df['population'] = medals_df['population'].apply(lambda x: "{:,}".format(x))

    # convert pandas dataframe to json
    medals_json = json.dumps(medals_df.to_dict('records'))
    return medals_json

@app.route("/api/v1.0/graph/<year>")
def graph(year):
    graphquery = f"""
        SELECT year, country_name, country_code,latitude, longitude, gdp, population, gold_medals From medals
        WHERE year = {year}
        AND gold_medals >= 1
        ORDER BY gold_medals DESC"""
    # import SQL table as pandas dataframe
    graph_df = pd.read_sql(graphquery, connection)

    # convert pandas dataframe to json
    graph_json = json.dumps(graph_df.to_dict('records'))
    return graph_json

# Dropdown
@app.route("/api/v1.0/medals/")
def dropdown():
    dropdownquery = f"""
        SELECT DISTINCT year FROM medals
        WHERE gold_medals >= 1
        ORDER BY year DESC"""
    # import SQL table as pandas dataframe
    dropdown_df = pd.read_sql(dropdownquery, connection)
    # convert pandas dataframe to json
    dropdown_json = json.dumps(dropdown_df["year"].to_list())
    return dropdown_json

@app.route("/api/v1.0/tokyo/<medals>")
def tokyo(medals):
    # import SQL table as pandas dataframe
    query = f"""With data as(
               SELECT country_name, gold_medals From tokyo
               Union All
               SELECT 'Your Country' as country_name,
                       {medals} as gold_medals
               )
               SELECT RANK() OVER (ORDER BY a.gold_medals DESC) as Rank, a.country_name, a.gold_medals from data a;"""
    tokyo_df = pd.read_sql(query, connection)

    # convert pandas dataframe to json
    tokyo_json = json.dumps(tokyo_df.to_dict('records'))
    
    return tokyo_json

if __name__ == "__main__":
       app.run(debug=True)