import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: any
  dataReceived: boolean = false

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.showProfile()
  }

  showProfile(){
    const token = sessionStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      const jwtHelper = new JwtHelperService()
      const decodedToken = jwtHelper.decodeToken(token)
      console.log(decodedToken);

      const currUser = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']

      const cachedUser = sessionStorage.getItem(`${currUser}`)

      if(cachedUser){
        this.user = JSON.parse(cachedUser)
        console.log('cache hit')
        console.log(cachedUser)
        console.log(this.user);
        
        this.dataReceived = true
      }

      else{
        this.http.get<any>('https://localhost:7238/api/Main/ShowProfile', {headers})
        .subscribe(response => {
          console.log('cache miss');
          const jsonString = JSON.stringify(response);
          this.user = response;
          console.log(response)
          this.dataReceived = true
          sessionStorage.setItem(`${currUser}`, jsonString)
          console.log('cache updated');
          
        });
      }
    }
      
    
    else{
      console.log('Error occured while trying to see profile');
      
    }

  }

  goBack(){
    this.router.navigate(['file-list'])
  }
}
