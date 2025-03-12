import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { HeaderComponent } from "../components/header/header.component";
import { HeaderTitleService } from '../services/header-title/header-title.service';
import { Title } from '@angular/platform-browser';
import { LoggedinUserService } from '../services/loggedin-user/loggedin-user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from "../components/edit-profile/edit-profile.component";
import { Quizzes } from '../model/quizzes.model';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, HeaderComponent, CommonModule, EditProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  // quizzes: Quizzes = new Quizzes('', '', new Date(), '', '', '');

  myQuizzes: Quizzes[] = [];
  
  getQuizTitle: string = "";
  scoreboard: any[] = [];

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

    this.myQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    // this.myQuizzes = this.myQuizzes.map(x => (x.creatorId == this.loggedinUserId || x.creatorEmail == this.loggedinUserEmail ? x : this.quizzes));
    this.myQuizzes = this.myQuizzes.filter(x => x.creatorId === this.loggedinUserId || x.creatorEmail === this.loggedinUserEmail);
  }

  getQuestionCount(quizId: string): string {
    const data = JSON.parse(localStorage.getItem(quizId) || '[]'); 
    return data.length;
  }

  getAttendeeCount(quizId: string): number {
    const currentScoreboard: any[] = JSON.parse(localStorage.getItem(`scoreboard-${quizId}`) || '[]');
    return currentScoreboard.length;
  }

  showScoreboard(quizId: string, quizTitle: string): void {
    const scoreboardData = JSON.parse(localStorage.getItem(`scoreboard-${quizId}`) || '[]');
    this.scoreboard = scoreboardData;
    this.getQuizTitle = quizTitle;
  }

}
