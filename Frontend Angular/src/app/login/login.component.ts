import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  username!: string
  password!: string

  //@Output() loginEvent = new EventEmitter<void>()

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    //sessionStorage.clear()
    //window.location.href = 'login'
    const token = sessionStorage.getItem('access_token')
    if(token){
      alert('Did not logout properly')
      sessionStorage.clear()
      window.location.href = 'login'
    }
  }

  login(): void{
    const user = {
      Username: this.username,
      Password: this.password 
    }

    console.log(`Username: ${user.Username}`)
    console.log(`Password: ${user.Password}`)

    const apiUrl = 'https://localhost:7238/api/Main/login';
    

    this.http.post(apiUrl, user, { responseType: 'text' })
    .subscribe({
      next: response => {
        console.log('Login successful: ', response)
        alert('Logged in successfully')
        sessionStorage.setItem("access_token", response)
    
        //localStorage.setItem("access_token", response)
        window.location.href = 'file-list'
        //this.router.navigate(['file-list'], { replaceUrl: true });
      },
      error: error =>{ 
        console.error('Login failed:', error)
        alert(error.error)

      },
      complete: () => console.log('Login complete') // Optional for handling completion
    });
  }
}
