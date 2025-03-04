import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-error',
  imports: [NavbarComponent],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {
  constructor(
    private titleService: Title
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle('Not Found - QuizFusion');
  }
}
