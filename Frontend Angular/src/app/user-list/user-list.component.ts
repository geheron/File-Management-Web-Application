import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  users: any[] = []

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    const token = sessionStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get<any[]>('https://localhost:7238/api/Main/GetAllUsers', {headers})
      .subscribe(response => {
        this.users = response;
        console.log(response)
      });
    }
    else{
      console.log('Cannot get users');
      
    }
  }
}
