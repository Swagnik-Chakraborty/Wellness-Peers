import { SinglePatientDetailsComponent } from './components/single-patient-details/single-patient-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './components/patient/patient.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'' , component:DashboardComponent},
  {path:'patients' , component:PatientComponent},
  {path:'patient/:hadmId',component:SinglePatientDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
