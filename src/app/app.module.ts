import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TableModule } from 'primeng/table';
import { NgxEchartsModule } from 'ngx-echarts';
import { PatientComponent } from './components/patient/patient.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SinglePatientDetailsComponent } from './components/single-patient-details/single-patient-details.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { GaugeChartModule } from "angular-gauge-chart";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PatientComponent,
    SidenavComponent,
    SinglePatientDetailsComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    HttpClientModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    NgxEchartsModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
