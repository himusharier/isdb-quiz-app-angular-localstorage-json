import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  user: User = new User('', '', '', '');
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

  login(
    userEmail: string,
    userPassword: string
  ): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((u: any) => u.userEmail === userEmail && u.userPassword === userPassword);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      return true;
    }

    return false;
  }

  update(
    userId: string,
    userName: string
  ): boolean {
    let loggedinUser = JSON.parse(localStorage.getItem('loggedInUser') || '[]');
    // loggedinUser = loggedinUser.map((user: any) => {
    //   if (user.userId === userId) {
    //     user.userName = userName;
    //     return user;
    //   }
    //   return user;
    // });

    if (loggedinUser.userId === userId) {
      loggedinUser.userName = userName;
      localStorage.setItem('loggedInUser', JSON.stringify(loggedinUser));
    }
    localStorage.setItem('loggedInUser', JSON.stringify(loggedinUser));

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.map((user: any) => {
      if (user.userId === userId) {
        user.userName = userName;
        return user;
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(users));

    return true;
    
  }

}
