import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('access_token')) {
      return true; // Access token exists, allow navigation
    } else {
      this.router.navigate(['login']); // No access token, redirect to login
      return false;
    }
  }
}
