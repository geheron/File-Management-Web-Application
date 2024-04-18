import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  user: any
  dataReceived = false

  ngOnInit(): void {
    const retrievedString = sessionStorage.getItem("user_profile");
    if (retrievedString) {
      this.user = JSON.parse(retrievedString);
      console.log(this.user);
      this.dataReceived = true
      sessionStorage.removeItem("user_profile")
    }
  }
}
