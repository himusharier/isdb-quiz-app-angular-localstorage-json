import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { HeaderComponent } from "../components/header/header.component";
import { HeaderTitleService } from '../services/header-title/header-title.service';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { QuizFormComponent } from "./quiz-form/quiz-form.component";
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedinUserService } from '../services/loggedin-user/loggedin-user.service';
import { CreateQuizService } from '../services/create-quiz/create-quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Quizzes } from '../model/quizzes.model';

@Component({
  selector: 'app-create-quiz',
  imports: [NavbarComponent, HeaderComponent, QuizFormComponent, CommonModule, FormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent implements OnInit {
  loggedinUserId: string = "";
  loggedinUserName: string = "";
  loggedinUserEmail: string = "";

  quizTitle: string = "";
  quizDate: string = "";

  message: SafeHtml = "";
  isError = false;

  getQuizId: string = "";

  constructor(
    private headerTitleService: HeaderTitleService,
    private titleService: Title,
    private route: ActivatedRoute,
    private loggedinUserService: LoggedinUserService,
    private router: Router,
    private createQuizService: CreateQuizService,
    private domSanitizer: DomSanitizer
  ) {
    this.route.queryParams.subscribe(params => {
      this.getQuizId = params['quiz'] || '';
    });
  }

  updateHeaderTitleValue(givenTitle: string) {
    this.headerTitleService.updateHeaderTitle(givenTitle);
  }

  private quizIdGenerator(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  quizId: string = this.quizIdGenerator();
  
  ngOnInit(): void {
    this.updateHeaderTitleValue("Create New Quiz");
    this.titleService.setTitle('Create Quiz - QuizFusion');

    if (!this.loggedinUserService.isLoggedIn()) {
      this.router.navigate(['/home']);

    } else {
      const loggedInUser = this.loggedinUserService.getLoggedInUser();
      this.loggedinUserId = loggedInUser ? loggedInUser.userId : ''; 
      this.loggedinUserName = loggedInUser ? loggedInUser.userName : ''; 
      this.loggedinUserEmail = loggedInUser ? loggedInUser.userEmail : ''; 
    }

    const currentDate = new Date();
    this.quizDate = currentDate.toISOString().split('T')[0];

    // Retrieve quiz title from localStorage
    const quizzesList: Quizzes[] = JSON.parse(localStorage.getItem('quizzes') || '[]')
    // Find the quiz based on quizId (the one that matches the content query parameter)
    const quiz = quizzesList.find(x => x.quizId === this.getQuizId);
    // If the quiz exists, set the quizTitle
    if (quiz) {
      this.quizTitle = quiz.quizTitle;
      this.quizDate = quiz.quizDate;
      this.quizId = quiz.quizId;
      this.loggedinUserName = quiz.creatorName;
      this.loggedinUserEmail = quiz.creatorEmail;
    }

  }

  onSubmit() {
    if (this.quizTitle != "") {
      const success = this.createQuizService.createQuiz(
        {
          quizId: this.quizId,
          quizTitle: this.quizTitle,
          quizDate: this.quizDate,
          creatorName: this.loggedinUserName,
          creatorEmail: this.loggedinUserEmail,
          creatorId: this.loggedinUserId
        }
      );

      if (success) {
        this.message = this.domSanitizer.bypassSecurityTrustHtml('<div class="alert alert-success" role="alert"><i class="bi bi-check-circle"></i> Quiz created successfully!</div>');
        this.isError = false;
        setTimeout(() => 
          window.location.href=`create-quiz?quiz=${this.quizId}`
          , 1000);

        // this.quizTitle = "";

      } else {
        this.message = this.domSanitizer.bypassSecurityTrustHtml('<div class="alert alert-danger" role="alert"><i class="bi bi-exclamation-circle"></i> Error while creating quiz! Try again...</div>');
        this.isError = true;
        setTimeout(() => this.message = "", 3000);
      }
      
    } else {
      this.message = this.domSanitizer.bypassSecurityTrustHtml('<div class="alert alert-danger" role="alert"><i class="bi bi-x-circle"></i> Please enter quiz title correctly!</div>');
      this.isError = true;
      setTimeout(() => this.message = "", 3000);
    }

  }

  onUpdate() {
    if (this.quizTitle != "") {
      const success = this.createQuizService.updateQuiz(
          this.quizId,
          this.quizTitle
      );

      if (success) {
        this.message = this.domSanitizer.bypassSecurityTrustHtml('<div class="alert alert-success" role="alert"><i class="bi bi-check-circle"></i> Quiz title updated!</div>');
        this.isError = false;
        setTimeout(() => 
          window.location.href=`create-quiz?quiz=${this.quizId}`
          , 1000);

        // this.quizTitle = "";

      } else {
        this.message = this.domSanitizer.bypassSecurityTrustHtml('<div class="alert alert-danger" role="alert"><i class="bi bi-exclamation-circle"></i> Error while updating quiz title! Try again...</div>');
        this.isError = true;
        setTimeout(() => this.message = "", 3000);
      }
      
    } else {
      this.message = this.domSanitizer.bypassSecurityTrustHtml('<div class="alert alert-danger" role="alert"><i class="bi bi-x-circle"></i> Please enter quiz title correctly!</div>');
      this.isError = true;
      setTimeout(() => this.message = "", 3000);
    }
  }

}
