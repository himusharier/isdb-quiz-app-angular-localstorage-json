import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { HeaderComponent } from "../components/header/header.component";
import { HeaderTitleService } from '../services/header-title/header-title.service';
import { Title } from '@angular/platform-browser';
import { QuizFormComponent } from "./quiz-form/quiz-form.component";
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedinUserService } from '../services/loggedin-user/loggedin-user.service';

@Component({
  selector: 'app-create-quiz',
  imports: [NavbarComponent, HeaderComponent, QuizFormComponent],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent implements OnInit {
  loggedinUserId: string = "";
  loggedinUserName: string = "";
  loggedinUserEmail: string = "";

  content: string = "404";
  date: string = new Date().toISOString();

  constructor(
    private headerTitleService: HeaderTitleService,
    private titleService: Title,
    private route: ActivatedRoute,
    private loggedinUserService: LoggedinUserService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.content = params['quiz'] || '404';
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
}
