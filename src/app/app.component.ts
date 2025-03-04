import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quizfusion-webapp';
}

/*export class User {
  userId: string;
  userName: string;
  userEmail: string;
  userPassword: string

  constructor(userId: string, userName: string, userEmail: string, userPassword: string) {
    this.userId = userId;
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPassword = userPassword
  }
}*/
