import json
from flask import Flask, jsonify;
import pandas as pd;
from riskscorecal import getPatientSample;
from patientDetails import setPatientDetails;
from flask_cors import CORS;

app = Flask(__name__)
CORS(app,origins=['http://localhost:4200'])
patientsData = getPatientSample()


@app.route('/piedata')
def get_piedata():

    temp = patientsData.Riskgroup.value_counts()
    data = [
        {
            'Urgent' : str(temp['Urgent']),
            'High' : str(temp['High']),
            'Medium' : str(temp['Medium']),
            'Low' : str(temp['Low']),
        }
    ]
    return jsonify(data)

@app.route('/topten')
def get_toptendata():
    temp = patientsData.query("Riskscore == 4.0").sample(10).to_json(orient ='records')
    return temp

@app.route('/patientslist')
def get_patientslist():
    temp = patientsData.to_json(orient ='records')
    return temp

@app.route('/patientDetails/<hadmID>')
def get_patientDetails(hadmID):

    temp = setPatientDetails(hadmID)
    temp['AGE'] = patientsData.AGE[patientsData.HADM_ID==int(hadmID)].to_string(index=False)
    temp['Riskscore']= patientsData.Riskscore[patientsData.HADM_ID==int(hadmID)].to_string(index=False)
    temp['EDscore']= patientsData.EDscore[patientsData.HADM_ID==int(hadmID)].to_string(index=False)
    temp['CCscore']= patientsData.CCscore[patientsData.HADM_ID==int(hadmID)].to_string(index=False)
    
    return jsonify([temp])