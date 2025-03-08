import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateQuizService {

  constructor() { }

  

  quizCreator(
    quiz: {
      quizId: string;
      quizTitle: string;
      quizDate: Date;
      creatorName: string;
      creatorEmail: string;
      creatorId: string;
    }
  ): boolean {
    let quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');

      const newQuiz = {
        ...quiz,
      };

      quizzes.push(newQuiz);
      localStorage.setItem('quizzes', JSON.stringify(quizzes));
      return true;
  }

}
