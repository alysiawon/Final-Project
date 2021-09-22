import numpy as np
import pandas as pd
import json
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from flask_cors import CORS
from config import password

# Set Up Database
host = "olympic-databases.cqg15afinz5u.us-east-2.rds.amazonaws.com"
engine = create_engine(f"postgresql://postgres:{password}@{host}:5432/olympic-databases")
connection = engine.connect()

# Set Up Flask
app = Flask(__name__)
CORS(app)

# Create Flask Routes
@app.route("/api/v1.0/medals")
def medals():
    # import SQL table as pandas dataframe
    medals_df = pd.read_sql('select * from medals', connection)
    
    # convert pandas dataframe to json
    medals_json = json.dumps(medals_df.to_dict('records'))
    
    return medals_json

@app.route("/api/v1.0/tokyo")
def tokyo():
    # import SQL table as pandas dataframe
    tokyo_df = pd.read_sql('select * from tokyo', connection)
    
    # convert pandas dataframe to json
    tokyo_json = json.dumps(tokyo_df.to_dict('records'))
    
    return tokyo_json
    

if __name__ == "__main__":
       app.run(debug=True)
