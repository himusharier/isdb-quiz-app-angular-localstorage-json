import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { HeaderComponent } from "../components/header/header.component";
import { HeaderTitleService } from '../services/header-title.service';

@Component({
  selector: 'app-create-quiz',
  imports: [NavbarComponent, HeaderComponent],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent implements OnInit {

  constructor(private headerTitleService: HeaderTitleService) {}

  updateHeaderTitleValue(givenTitle: string) {
    this.headerTitleService.updateHeaderTitle(givenTitle);
  }
  
  ngOnInit(): void {
    this.updateHeaderTitleValue("Create a Quiz");
  }
}
