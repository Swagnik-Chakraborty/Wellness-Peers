import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }

  getPieChartData():Observable<any>{
    return this.http.get<any>('http://127.0.0.1:5000/piedata');
  }

  getAllPatientData():Observable<any>{
    return this.http.get<any>('http://127.0.0.1:5000/patientslist');
  }

  getTopTenPatientData():Observable<any>{
    return this.http.get<any>('http://127.0.0.1:5000/topten');
  }

}