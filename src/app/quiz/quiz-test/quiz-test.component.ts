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
      this.quizForm.addControl(x.questionId, new FormControl('', [])); // Add validators if needed
    });

    if (!this.loggedinUserService.isLoggedIn()) {
      this.router.navigate(['/home']);
    } else {
      const loggedInUser = this.loggedinUserService.getLoggedInUser();
      this.loggedinUserId = loggedInUser ? loggedInUser.userId : '';
      this.loggedinUserName = loggedInUser ? loggedInUser.userName : '';
      this.loggedinUserEmail = loggedInUser ? loggedInUser.userEmail : '';
    }
  }

  getQuestionCount(quizId: string): string {
    const data = JSON.parse(localStorage.getItem(quizId) || '[]'); 
    return data.length;
  }

  onSubmit(): void {
    this.score = 0;
  
    // Iterate through the questions and calculate the score
    this.questionSet.forEach(x => {
      const controlValue = this.quizForm.get(x.questionId)?.value;
      if (controlValue === x.correctAnswer) {
        this.score++;
      }
    });
  
    // Prepare the data to be saved in the scoreboard
    const scoreboardData = {
      userId: this.loggedinUserId,
      userName: this.loggedinUserName,
      userEmail: this.loggedinUserEmail,
      score: this.score,
      totalQuestions: this.questionSet.length,
      attendTime: new Date().toISOString()
    };
  
    // Retrieve the current scoreboard data from localStorage (if any)
    const currentScoreboard: any[] = JSON.parse(localStorage.getItem(`scoreboard-${this.quizId}`) || '[]');
    
    // Append the new result to the existing scoreboard
    currentScoreboard.push(scoreboardData);
  
    // Save the updated scoreboard back to localStorage
    localStorage.setItem(`scoreboard-${this.quizId}`, JSON.stringify(currentScoreboard));
  
    // Show results to the user
    this.showResults = true;
  }
}