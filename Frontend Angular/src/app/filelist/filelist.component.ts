import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

interface FileUser{
  fileObject: any
  userObject: any
}

@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrl: './filelist.component.css'
})

export class FilelistComponent implements OnInit{
  files: any[] = []
  dataReceived = false
  admin!: boolean

  fileUsers: FileUser[] = []

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getFiles(); // Call getFiles() on initialization
  }

  getFiles() {
    const token = sessionStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      const jwtHelper = new JwtHelperService()
      const decodedToken = jwtHelper.decodeToken(token)
      console.log(decodedToken);
      

      
      if (decodedToken && decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin') {
        this.admin = true
        this.http.get<any[]>('https://localhost:7238/api/Main/GetAllFiles', {headers})
        .subscribe(response => {
          this.files = response;
          console.log(response)
          this.fileUsers = []
          this.files.forEach(file => {
            //const token = sessionStorage.getItem('access_token');

            if (token) {
              const headers = new HttpHeaders({
                Authorization: `Bearer ${token}`
              });

              this.http.get<any>('https://localhost:7238/api/Main/ShowProfileById?userId='+file.doneById, {headers})
              .subscribe(response => {
                  this.fileUsers.push({
                    fileObject: file,
                    userObject: response
                  })
              });
            }
          });
        
          this.dataReceived = true
        });
      } 
      else {
        this.admin = false
        this.http.get<any[]>('https://localhost:7238/api/Main/GetMyFiles', {headers})
        .subscribe(response => {
          this.files = response;
          console.log(response)

          this.files.forEach(file => {
            this.fileUsers.push({
              fileObject: file,
              userObject: null
            })
          });

          this.dataReceived = true
        });
      }
      
    }
    else{
      this.router.navigate(['home'])
    }
  }

  reloadFetch(){
    this.getFiles()
  }
}
