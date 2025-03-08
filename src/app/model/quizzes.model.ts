export class Quizzes {
  quizId: string;
  quizTitle: string;
  quizDate: Date;
  creatorName: string;
  creatorEmail: string;
  creatorId: string;

  constructor(quizId: string, quizTitle: string, quizDate: Date, creatorName: string, creatorEmail: string, creatorId: string) {
    this.quizId = quizId;
    this.quizTitle = quizTitle;
    this.quizDate = quizDate;
    this.creatorName = creatorName;
    this.creatorEmail = creatorEmail;
    this.creatorId = creatorId
  }
}