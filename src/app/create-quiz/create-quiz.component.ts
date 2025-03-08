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
  quizDate: Date = new Date();

  message: SafeHtml = "";
  isError = false;

  content: string = "";

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
      this.content = params['quiz'] || '';
    });
  }

  updateHeaderTitleValue(givenTitle: string) {
    this.headerTitleService.updateHeaderTitle(givenTitle);
  }
  
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
  }

  private quizIdGenerator(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  quizId: string = this.quizIdGenerator();

  onSubmit() {
    if (this.quizTitle != "") {
      
      const success = this.createQuizService.quizCreator(
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

}
