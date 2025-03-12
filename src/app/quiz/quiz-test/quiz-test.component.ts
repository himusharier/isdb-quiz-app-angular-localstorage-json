import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { HeaderTitleService } from '../../services/header-title/header-title.service';
import { LoggedinUserService } from '../../services/loggedin-user/loggedin-user.service';
import { Quizzes } from '../../model/quizzes.model';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-test',
  imports: [NavbarComponent, HeaderComponent, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.css']
})
export class QuizTestComponent implements OnInit {
  loggedinUserId: string = "";
  loggedinUserName: string = "";
  loggedinUserEmail: string = "";

  quizUserScore: string = "";
  quizUserTotal: string = "";

  @Input() quizId!: string; 
  getQuizTitle: string = "";

  quizForm: FormGroup;
  questionSet: any[] = [];
  score: number = 0;
  showResults: boolean = false;

  constructor(
    private headerTitleService: HeaderTitleService,
    private titleService: Title,
    private loggedinUserService: LoggedinUserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.quizForm = this.formBuilder.group({});
  }

  updateHeaderTitleValue(givenTitle: string) {
    this.headerTitleService.updateHeaderTitle(givenTitle);
  }

  ngOnInit(): void {
    this.updateHeaderTitleValue("Quiz Test");
    this.titleService.setTitle('Quiz Test - QuizFusion');
  
    const quizzesList: Quizzes[] = JSON.parse(localStorage.getItem('quizzes') || '[]');
    const quiz = quizzesList.find(x => x.quizId === this.quizId);
    if (quiz) {
      this.getQuizTitle = quiz.quizTitle;
    }
  
    const quizData = JSON.parse(localStorage.getItem(this.quizId) || '[]');
    if (quizData.length === 0) {
      window.location.href = "/quiz";
      return;
    }
    this.questionSet = quizData;
  
    this.quizForm = this.formBuilder.group({});
    this.questionSet.forEach(x => {
      // Convert questionId to string
      this.quizForm.addControl(String(x.questionId), new FormControl('')); 
    });
  
    if (!this.loggedinUserService.isLoggedIn()) {
      this.router.navigate(['/home']);
    } else {
      const loggedInUser = this.loggedinUserService.getLoggedInUser();
      this.loggedinUserId = loggedInUser ? loggedInUser.userId : '';
      this.loggedinUserName = loggedInUser ? loggedInUser.userName : '';
      this.loggedinUserEmail = loggedInUser ? loggedInUser.userEmail : '';
    }
    
    const scoreboardData = JSON.parse(localStorage.getItem(`scoreboard-${this.quizId}`) || '[]');
    const quizUserDetails = scoreboardData.find((entry: any) => entry.userId === this.loggedinUserId);
    this.quizUserScore =  quizUserDetails.score;
    this.quizUserTotal = quizUserDetails.totalQuestions;
    
  }
  

  getQuestionCount(quizId: string): string {
    const data = JSON.parse(localStorage.getItem(quizId) || '[]'); 
    return data.length.toString();
  }

  onSubmit(): void {
    this.score = 0;
  
    this.questionSet.forEach(x => {
      // Convert questionId to string here
      const control = this.quizForm.get(String(x.questionId)); 
      if (control) {
        const controlValue = control.value;
        if (controlValue === x.correctAnswer) {
          this.score++;
        }
      }
    });
    
    const scoreboardData = {
      userId: this.loggedinUserId,
      userName: this.loggedinUserName,
      userEmail: this.loggedinUserEmail,
      score: this.score,
      totalQuestions: this.questionSet.length,
      attendTime: new Date().toISOString()
    };
    const currentScoreboard: any[] = JSON.parse(localStorage.getItem(`scoreboard-${this.quizId}`) || '[]');
    currentScoreboard.push(scoreboardData);
    localStorage.setItem(`scoreboard-${this.quizId}`, JSON.stringify(currentScoreboard));

    this.showResults = true;
  }

  isUserInScoreboard(userId: string, quizId: string): boolean {
    const scoreboardData = JSON.parse(localStorage.getItem(`scoreboard-${quizId}`) || '[]');
    const userFound = scoreboardData.some((entry: any) => entry.userId === userId);
    return userFound;
  }

}
