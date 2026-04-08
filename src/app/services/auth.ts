

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Inject HttpClient to communicate with the PHP backend
  private http = inject(HttpClient);

  // Base URL for the PHP backend
  private apiUrl = 'http://localhost/angular-api';

  // Register a new user
  register(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register.php`, userData);
  }

  // Log in an existing user
  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, userData);
  }

  // Save login state in local storage
  saveUserSession(email: string): void {
    localStorage.setItem('loggedInUser', email);
  }

  // Check if a user is currently logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }

  // Get the logged in user's email
  getLoggedInUser(): string | null {
    return localStorage.getItem('loggedInUser');
  }

  // Clear login state
  logout(): void {
    localStorage.removeItem('loggedInUser');
  }
}