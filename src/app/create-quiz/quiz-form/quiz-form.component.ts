import { Component, Input, OnInit } from '@angular/core';
import { Quizzes } from '../../model/quizzes.model';

@Component({
  selector: 'app-quiz-form',
  imports: [],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.css'
})
export class QuizFormComponent implements OnInit {
  @Input() quizId!: string;

  ngOnInit(): void {
    const quizzesList: Quizzes[] = JSON.parse(localStorage.getItem('quizzes') || '[]')
    const quiz = quizzesList.find(x => x.quizId === this.quizId);
    if (!quiz) {
      window.location.href="/profile";
    }
  }

}
