import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TagContentType } from '@angular/compiler';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent {

  @Input() fileId!: string
  @Input() filename!: string

  constructor(private http: HttpClient){}

  downloadFile(){
    const token = sessionStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      const options = {
        headers,
        responseType: 'blob' as 'blob'
      };

    this.http.get('https://localhost:7238/api/Main/DownloadFile?fileId='+this.fileId, options)
    .subscribe({
      next: response => {
        const contentType = this.getContentTypeFromExtension(this.filename);
        const blob = new Blob([response], { type: contentType })
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.filename;
        document.body.appendChild(a);
        a.click();
        console.log('download success')
      },
      error: error => {
        console.log('Deletion error', error);
      }
    });
    }
    else{
      console.log('Authentication issue');
    }
  }

  getContentTypeFromExtension(fileName: string) {
    const extension = fileName.split('.').pop();
    switch (extension) {
      case 'pdf':
        return 'application/pdf';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      default:
        return 'application/octet-stream';
    }
  }

}
