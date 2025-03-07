import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-form',
  imports: [],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.css'
})
export class QuizFormComponent {
  @Input() quizId!: string;

}
