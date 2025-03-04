import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../../services/header-title/header-title.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
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
