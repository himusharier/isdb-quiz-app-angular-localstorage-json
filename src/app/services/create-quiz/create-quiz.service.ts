import { Injectable } from '@angular/core';
import { Quizzes } from '../../model/quizzes.model';

@Injectable({
  providedIn: 'root'
})
export class CreateQuizService {

  constructor() { }

  

  createQuiz(
    quiz: {
      quizId: string;
      quizTitle: string;
      quizDate: string;
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

  updateQuiz(
    quizId: string,
    quizTitle: string
  ): boolean {
    let quizzes = JSON.parse(localStorage.getItem('quizzes') || 'null');
    quizzes = quizzes.map((quiz: Quizzes) => {
      if (quiz.quizId === quizId) {
        quiz.quizTitle = quizTitle;
      }
      return quiz;
    });
    localStorage.setItem('quizzes', JSON.stringify(quizzes));

    return true;
    
  }

}
