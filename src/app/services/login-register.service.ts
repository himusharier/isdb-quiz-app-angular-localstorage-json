import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  constructor() { }

  private userIdGenerator(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  register(
    user: {
      userName: string; 
      userEmail: string; 
      userPassword: string 
    }
  ): boolean {
      let users = JSON.parse(localStorage.getItem('users') || '[]');

      if (users.some((u: any) => u.userEmail === user.userEmail)) {
        return false; 
      }

      const newUser = {
        userId: this.userIdGenerator(),
        ...user,
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      return true;
  }

}
