import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { HeaderComponent } from "../components/header/header.component";
import { HeaderTitleService } from '../services/header-title/header-title.service';
import { Title } from '@angular/platform-browser';
import { Quizzes } from '../model/quizzes.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizTestComponent } from "./quiz-test/quiz-test.component";
import { FormsModule } from '@angular/forms';
import { LoggedinUserService } from '../services/loggedin-user/loggedin-user.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-quiz',
  imports: [NavbarComponent, HeaderComponent, CommonModule, QuizTestComponent, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  quizzes: Quizzes[] = [];
  getQuizId: string = "";
  getQuizTitle: string = "";
  leaderboard: any[] = [];

  constructor(
    private headerTitleService: HeaderTitleService,
    private titleService: Title,
    private route: ActivatedRoute,
    private loggedinUserService: LoggedinUserService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.getQuizId = params['test'] || '';
    });
  }

  updateHeaderTitleValue(givenTitle: string) {
    this.headerTitleService.updateHeaderTitle(givenTitle);
  }
  
  ngOnInit(): void {
    this.updateHeaderTitleValue("Quizzes");
    this.titleService.setTitle('Quizzes - QuizFusion');

    this.quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
  }

  GettingQuizTitle(quizTitle: string): void {
    this.getQuizTitle = quizTitle;
  }

  getQuestionCount(quizId: string): string {
    const data = JSON.parse(localStorage.getItem(quizId) || '[]'); 
    return data.length;
  }

  private modal: bootstrap.Modal | null = null;

  joiningQuiz(quizId: string) {
    if (this.loggedinUserService.isLoggedIn()) {
          // this.router.navigate([`/quiz?test=${quizId}`]);
          window.location.href=`/quiz?test=${quizId}`;
    
        } else {
          const loginFirstModal = document.getElementById('loginfirst');
          if (loginFirstModal) {
            this.modal = new bootstrap.Modal(loginFirstModal);
            this.modal.show();
          }
        }
  }

  // Show the leaderboard for a specific quiz
  showLeaderboard(quizId: string): void {
    const scoreboardData = JSON.parse(localStorage.getItem(`scoreboard-${quizId}`) || '[]');
    this.leaderboard = scoreboardData;
  }

  // Optionally, you can also add logic to handle the modal closing
  closeLeaderboard(): void {
    this.leaderboard = [];
  }

}
