import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { HeaderComponent } from "../components/header/header.component";
import { HeaderTitleService } from '../services/header-title/header-title.service';
import { Title } from '@angular/platform-browser';
import { Quizzes } from '../model/quizzes.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  imports: [NavbarComponent, HeaderComponent, CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  quizzes: Quizzes[] = [];

  constructor(
    private headerTitleService: HeaderTitleService,
    private titleService: Title
  ) {}

  updateHeaderTitleValue(givenTitle: string) {
    this.headerTitleService.updateHeaderTitle(givenTitle);
    this.titleService.setTitle('Quizzes - QuizFusion');
  }
  
  ngOnInit(): void {
    this.updateHeaderTitleValue("Quizzes");

    this.quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
  }
}
