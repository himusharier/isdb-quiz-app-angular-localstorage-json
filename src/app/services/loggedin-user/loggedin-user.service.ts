import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedinUserService {
  constructor() { }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedInUser') !== null;
  }

  getLoggedInUser(): any {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
  }

}
