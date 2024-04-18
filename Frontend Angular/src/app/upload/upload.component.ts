import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit{
  selectedFile!: File;
  name!: string;
  textAreaValue!: string
  user!: string

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = sessionStorage.getItem('access_token')
    if(token){
      const jwtHelper = new JwtHelperService()
      const decodedToken = jwtHelper.decodeToken(token)
      console.log(decodedToken);
      this.user = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    }
    else{
      this.router.navigate(['home'])
    }
    
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    const token = sessionStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      const options = {
        headers,
        responseType: 'text' as 'text'
      };

      const formData = new FormData();
      formData.append('Name', this.name);
      formData.append('File', this.selectedFile);

      this.http.post('https://localhost:7238/api/Main/UploadFile', formData, options)
      .subscribe({
        next: response => {
          console.log('File successfully uploaded:', response)
          this.textAreaValue = response
          
        },
        error: error => console.error('Upload failed:', error),
        complete: () => console.log('Upload complete') // Optional for handling completion
      });
    }
    else{
      this.textAreaValue = 'Authentication issue'
    }

  }

  logout(): void{
    sessionStorage.clear()
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
