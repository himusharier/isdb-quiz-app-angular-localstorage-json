import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../../services/header-title.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  headerTitle: string = "";

  constructor(private headerTitleService: HeaderTitleService) {}

  ngOnInit(): void {
    this.headerTitle = this.headerTitleService.headerTitle;
  }
  
}
