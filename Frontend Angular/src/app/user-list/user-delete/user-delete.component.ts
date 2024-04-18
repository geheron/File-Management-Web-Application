import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.css'
})
export class UserDeleteComponent {
  @Input() userId!: string

  @Output() deleteUserEvent = new EventEmitter<void>()

  constructor(private http: HttpClient){}

  deleteUser(){
    const confirmed = confirm('Are you sure you want to delete this file?');

    if(!confirmed){
      return
    }

    const token = sessionStorage.getItem('access_token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.http.delete<any>('https://localhost:7238/api/Main/DeleteUser?userId=' + this.userId, {headers})
      .subscribe({
        next: response => {
          console.log('User deleted successfully:', response)
          this.deleteUserEvent.emit()
        },
        error: error => {
          if (error.status === 200) {
            console.log('User deleted successfully (non-standard response):', error.text);
            //console.log('Before emit')
            this.deleteUserEvent.emit()
            //console.log('After emit')
          } else {
            console.error('Error deleting user:', error);
          }
        }
      });
    }
    else{
      this.deleteUserEvent.emit()
    }
  }
}
