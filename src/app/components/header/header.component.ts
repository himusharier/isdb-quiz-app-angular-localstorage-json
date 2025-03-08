import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../../services/header-title/header-title.service';
import { Router } from '@angular/router';
import { LoggedinUserService } from '../../services/loggedin-user/loggedin-user.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  headerTitle: string = "";

  constructor(
    private headerTitleService: HeaderTitleService,
    private loggedinUserService: LoggedinUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.headerTitle = this.headerTitleService.headerTitle;
  }

  private modal: bootstrap.Modal | null = null;
  
  createQuiz() {
    if (this.loggedinUserService.isLoggedIn()) {
      // this.router.navigate(['/create-quiz']);
      window.location.href="/create-quiz";

    } else {
      const loginFirstModal = document.getElementById('loginfirst');
      if (loginFirstModal) {
        this.modal = new bootstrap.Modal(loginFirstModal);
        this.modal.show();
      }
    }
  }
  
}
