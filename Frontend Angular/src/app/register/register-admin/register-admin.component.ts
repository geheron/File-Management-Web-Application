import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css'
})
export class RegisterAdminComponent {
  username!: string
  password!: string
  firstname!: string
  lastname!: string
  address!: string
  phoneNumber!: string

  constructor(private http: HttpClient){}

  signUp(): void {
    const user = {
      username: this.username,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      address: this.address,
      phoneNumber: this.phoneNumber
    };

    const apiUrl = 'https://localhost:7238/api/Main/AdminRegistration';

    this.http.post(apiUrl, user)
    .subscribe({
      next: response => {
        console.log('Sign up successful: ', response)
      },
      error: error => console.error('SignUp failed:', error),
      complete: () => console.log('SignUp complete')
    });
  }
}
