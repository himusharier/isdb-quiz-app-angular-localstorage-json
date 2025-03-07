import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { HeaderComponent } from "../components/header/header.component";
import { HeaderTitleService } from '../services/header-title/header-title.service';
import { Title } from '@angular/platform-browser';
import { LoggedinUserService } from '../services/loggedin-user/loggedin-user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from "../components/edit-profile/edit-profile.component";

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, HeaderComponent, CommonModule, EditProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  loggedinUserId: string = "";
  loggedinUserName: string = "";
  loggedinUserEmail: string = "";

  constructor(
    private headerTitleService: HeaderTitleService,
    private titleService: Title,
    private loggedinUserService: LoggedinUserService,
    private router: Router
  ) {}

  updateHeaderTitleValue(givenTitle: string) {
    this.headerTitleService.updateHeaderTitle(givenTitle);
    this.titleService.setTitle('Profile - QuizFusion');
  }
  
  ngOnInit(): void {
    this.updateHeaderTitleValue("Profile");

    if (!this.loggedinUserService.isLoggedIn()) {
      this.router.navigate(['/home']);

    } else {
      const loggedInUser = this.loggedinUserService.getLoggedInUser();
      this.loggedinUserId = loggedInUser ? loggedInUser.userId : ''; 
      this.loggedinUserName = loggedInUser ? loggedInUser.userName : ''; 
      this.loggedinUserEmail = loggedInUser ? loggedInUser.userEmail : ''; 
    }

  }
}
