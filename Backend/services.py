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

@app.route('/linechart')
def get_linedata():

    data = patientsData.groupby('AGE')["Riskscore"].mean()
    ret = []

    # bins= [0,10,20,30,40,50,60,70,80,90,1000]
    labels = [0,0,0,0,0,0,0,0,0,0]
    count = [0,0,0,0,0,0,0,0,0,0]

    # ret[1] = pd.cut(data.index, bins=bins, labels=labels, right=False)

    for i in data.index:
        x = int(i/10)%10
        labels[x]+=data[i]
        count[x]+=1
    for i in range(10):
        x = labels[i]/count[i]
        if x > 3:
            x ="Urgent"
        elif x >2:
            x ="High"
        elif x >1:
            x ="Medium"
        else:
            x ="Low"
        ageGroup = str(i*10)+"-"+str((i*10)+9)
        if i == 9:
            curr = {"90-":x}
        else:
            curr = {
                ageGroup : x
            }
        ret.append(curr)
    return jsonify(ret)
