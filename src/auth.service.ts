import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = false;

  constructor(private http: HttpClient) {
    // Check if sessionStorage is available
    if (typeof sessionStorage !== 'undefined') {
      // Check if session storage has a logged-in status
      this.loggedIn = sessionStorage.getItem('loggedIn') === 'true';
    }
  }

  login(): void {
    this.loggedIn = true;
    // Store logged-in status in session storage if available
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('loggedIn', 'true');
    }
  }

  logout(): void {
    this.loggedIn = false;
    // Remove logged-in status from session storage if available
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('loggedIn');
    }
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}
