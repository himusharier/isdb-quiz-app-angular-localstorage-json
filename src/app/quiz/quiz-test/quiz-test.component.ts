import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderTitleService } from '../../services/header-title/header-title.service';
import { LoggedinUserService } from '../../services/loggedin-user/loggedin-user.service';
import { Quizzes } from '../../model/quizzes.model';

@Component({
  selector: 'app-quiz-test',
  imports: [],
  templateUrl: './quiz-test.component.html',
  styleUrl: './quiz-test.component.css'
})
export class QuizTestComponent implements OnInit {
  loggedinUserId: string = "";
  loggedinUserName: string = "";
  loggedinUserEmail: string = "";

  @Input() quizId!: string;

  constructor(
      private headerTitleService: HeaderTitleService,
      private titleService: Title,
      private loggedinUserService: LoggedinUserService,
      private router: Router
  ) {}

  updateHeaderTitleValue(givenTitle: string) {
    this.headerTitleService.updateHeaderTitle(givenTitle);
  }

  ngOnInit(): void {
    this.updateHeaderTitleValue("Quiz Test");
    this.titleService.setTitle('Quiz Test - QuizFusion');

    const quizzesList: Quizzes[] = JSON.parse(localStorage.getItem('quizzes') || '[]')
    const quiz = quizzesList.find(x => x.quizId === this.quizId);
    if (!quiz) {
      debugger;
      window.location.href="/home";
    }

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
