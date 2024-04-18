import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  loggedIn!: boolean

  constructor(private router: Router){}

  ngOnInit(): void {
    const token = sessionStorage.getItem('access_token');
    console.log('Token: ', token);
    
    if (token) {
      this.loggedIn = true
    }
    else{
      this.loggedIn = false
    }
  }
  
  clearLocalStorage(){
    sessionStorage.clear()
  }

  logout(): void{
    sessionStorage.clear()
    alert('Logged out successfully')
    window.location.href = 'login'
    //this.router.navigate(['login']);
    console.log("User logged out successfully");
  }

  profile(): void{
    const token = sessionStorage.getItem('access_token')
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      const jwtHelper = new JwtHelperService()
      const decodedToken = jwtHelper.decodeToken(token)
      console.log(decodedToken);

      if (decodedToken && decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin'){
        this.router.navigate(['admin-profile'])
      }
      else{
        this.router.navigate(['profile'])
      }
    }
    
  }

}
