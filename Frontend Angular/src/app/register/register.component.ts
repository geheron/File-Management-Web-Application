import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  username!: string
  password!: string
  firstname!: string
  lastname!: string
  address!: string
  phoneNumber!: string

  constructor(private http: HttpClient, private router: Router){}


  signUp(): void {
    const user = {
      username: this.username,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      address: this.address,
      phoneNumber: this.phoneNumber
    };

    const apiUrl = 'https://localhost:7238/api/Main/UserRegistration';

    this.http.post(apiUrl, user)
    .subscribe({
      next: response => {
        console.log('Sign up successful: ', response)
        alert('Signed up successfully!')
        this.router.navigate(['login'])
      },
      error: error => {
        console.error('SignUp failed:', error)
        alert(error.error)
      },
      complete: () => console.log('SignUp complete') // Optional for handling completion
    });
  }
}
