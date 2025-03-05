import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisterComponent } from "../register/register.component";
import { LoginComponent } from "../login/login.component";
import { LoggedinUserService } from '../../services/loggedin-user/loggedin-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RegisterComponent, LoginComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  loggedinUserName: string = "";

  constructor(
    private loggedinUserService: LoggedinUserService
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.loggedinUserService.isLoggedIn();

    if (this.isUserLoggedIn) {
      const loggedInUser = this.loggedinUserService.getLoggedInUser();
      this.loggedinUserName = loggedInUser ? loggedInUser.userName : ''; 
    }    
  }

  logoutBtn() {
    this.loggedinUserService.logout();
    window.location.reload();
  }

}
