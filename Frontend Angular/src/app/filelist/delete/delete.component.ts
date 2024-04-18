import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {  

  @Input() fileId!: string

  @Output() deleteEvent = new EventEmitter<void>()

  constructor(private http: HttpClient){}

  deleteFile(){
    const confirmed = confirm('Are you sure you want to delete this file?');

    if(!confirmed){
      return
    }

    const token = sessionStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.http.delete<any>('https://localhost:7238/api/Main/DeleteFile?fileId=' + this.fileId, {headers})
      .subscribe({
        next: response => {
          console.log('File deleted successfully:', response)
          //this.deleteEvent.emit()
        },
        error: error => {
          if (error.status === 200) {
            console.log('File deleted successfully (non-standard response):', error.text);
            //console.log('Before emit')
            this.deleteEvent.emit()
            //console.log('After emit')
          } else {
            console.error('Error deleting file:', error);
          }
        }
      });
    }
    else{
      this.deleteEvent.emit()
    }
  }

}
