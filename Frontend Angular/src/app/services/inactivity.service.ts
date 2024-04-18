import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {

  constructor() { }

  private timer: any;
  private timeout = 30 * 60 * 1000; // 30 minutes in milliseconds

  startTimer() {
    console.log('starting timer');
    
    this.timer = setTimeout(() => {
      console.error('User inactive for 30 minutes. Logging out...');
      this.logout(); // Call a separate logout function
    }, this.timeout);
  }

  resetTimer() {
    console.log('resetting timer');
    
    clearTimeout(this.timer);
    this.startTimer();
  }

  logout(): void{
    sessionStorage.clear()
    window.location.href = 'login'
    //this.router.navigate(['login']);
    console.log("User logged out successfully");
  }
}
