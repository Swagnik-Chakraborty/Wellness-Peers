import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  constructor(private router:Router){}
  navigateDashboard(){
    this.router.navigateByUrl('');
  }

  navigatePatients(){
    this.router.navigateByUrl('/patients');
  }
  navigateToSinglePatientPage()
  {
    this.router.navigateByUrl('/singlePatient');
  }
}
