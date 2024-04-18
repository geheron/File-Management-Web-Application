import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-id-profile',
  templateUrl: './id-profile.component.html',
  styleUrl: './id-profile.component.css'
})
export class IdProfileComponent {
  @Input() userId!: string
  @Input() uploadedBy!: string

  constructor(private http: HttpClient, private router: Router){}

  getUser(){
    const token = sessionStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get<any>('https://localhost:7238/api/Main/ShowProfileById?userId='+this.userId, {headers})
      .subscribe(response => {

        const jsonString = JSON.stringify(response);
        sessionStorage.setItem("user_profile", jsonString)
        console.log('Response: ', response)
        this.router.navigate(['user-profile'])
      });
    }
      
    
    else{
      console.log('Error occured while trying to see profile');
      
    }

  }
}
