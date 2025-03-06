import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoggedinUserService {
  constructor() { }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedInUser') !== null;
  }

  getLoggedInUser(): User {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
  }

}
