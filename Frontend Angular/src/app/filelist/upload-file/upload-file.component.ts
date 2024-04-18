import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent implements OnInit{
  selectedFile!: File | null
  name!: string
  user!: string

  @Output() uploadEvent = new EventEmitter<void>()

  @ViewChild('fileInput') fileInput!: ElementRef;

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

      if(this.selectedFile){
        const formData = new FormData();
      formData.append('Name', this.name);
      formData.append('File', this.selectedFile);

      this.http.post('https://localhost:7238/api/Main/UploadFile', formData, options)
      .subscribe({
        next: response => {
          console.log('File successfully uploaded:', response)
          alert('File uploaded successfully!')
          this.uploadEvent.emit()
          this.name = ""
          this.resetFileInput()
        },
        error: error => {
          console.error('Upload failed:', error)
          alert('Upload failed! Please check your file or try again later.')
        }, 
        complete: () => console.log('Upload complete') // Optional for handling completion
      });
      }

      
    }
    else{
      console.log('Authentication issue');
      
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

  resetFileInput() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = null;
    }
  }
}
