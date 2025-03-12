import { Component, Input, OnInit } from '@angular/core';
import { Quizzes } from '../../model/quizzes.model';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-form',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.css'
})
export class QuizFormComponent implements OnInit {
  @Input() quizId!: string;

  questionForm!: FormGroup;
  questions: any[] = [];
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const quizzesList: Quizzes[] = JSON.parse(localStorage.getItem('quizzes') || '[]')
    const quiz = quizzesList.find(x => x.quizId === this.quizId);
    if (!quiz) {
      window.location.href="/profile";
    }

    // Initialize the form
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([this.createOption()]),  // Dynamic options array
      correctAnswer: ['', Validators.required]
    });

    // Load saved questions from localStorage if available
    const savedQuestions = localStorage.getItem(this.quizId);
    if (savedQuestions) {
      this.questions = JSON.parse(savedQuestions);
    }
  }

  // Getter for options form array
  get options() {
    return (this.questionForm.get('options') as FormArray);
  }

  // Function to create an option form control
  createOption(): FormGroup {
    return this.fb.group({
      optionText: ['', Validators.required]
    });
  }

  // Add a new option
  addOption() {
    this.options.push(this.createOption());
  }

  // Remove an option
  removeOption(index: number) {
    this.options.removeAt(index);
  }

  // Submit the form and save the question
  onSubmit(): void {
    if (this.questionForm.invalid) {
      return;
    }

    const formData = this.questionForm.value;

    // Create a new question object with a unique questionId
    const newQuestion = {
      questionId: new Date().getTime(),  // Unique questionId based on timestamp
      question: formData.question,
      options: formData.options.map((opt: { optionText: string }) => opt.optionText),
      correctAnswer: formData.correctAnswer
    };

    // Add the new question to the list
    this.questions.push(newQuestion);

    // Save to localStorage
    localStorage.setItem(this.quizId, JSON.stringify(this.questions));

    // Reset the form
    this.questionForm.reset();
    this.options.clear();
    this.addOption();
  }

  // Delete a question by its ID
  deleteQuestion(questionId: number): void {
    // Find the index of the question by its questionId
    const index = this.questions.findIndex(q => q.questionId === questionId);
    
    if (index !== -1) {
      // Remove the question from the array
      this.questions.splice(index, 1);
      
      // Update the local storage with the updated questions array
      localStorage.setItem(this.quizId, JSON.stringify(this.questions));
    }
  }
}
