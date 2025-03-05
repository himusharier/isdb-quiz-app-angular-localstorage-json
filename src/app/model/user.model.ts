export class User {
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
}