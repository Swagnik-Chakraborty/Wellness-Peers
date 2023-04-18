import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(private route: Router) {}
  email!: string;
  password!: number;
  //admin_email='admin@gamil.com'
  //admin_password=123;

  onSubmit() {
    if (this.email == 'admin@gmail.com' && this.password == 123) {
      console.log('hh');
    }
  }
}
