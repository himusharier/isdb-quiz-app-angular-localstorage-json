import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { HeaderComponent } from "../components/header/header.component";
import { HeaderTitleService } from '../services/header-title.service';

@Component({
  selector: 'app-quiz',
  imports: [NavbarComponent, HeaderComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {

  constructor(private headerTitleService: HeaderTitleService) {}

  updateHeaderTitleValue(givenTitle: string) {
    this.headerTitleService.updateHeaderTitle(givenTitle);
  }
  
  ngOnInit(): void {
    this.updateHeaderTitleValue("Quiz List");
  }
}
