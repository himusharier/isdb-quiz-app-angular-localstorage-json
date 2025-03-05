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
  loginFirstModal = document.getElementById('loginfirst');
  createQuiz() {
    if (this.loggedinUserService.isLoggedIn()) {
      this.router.navigate(['/create-quiz']);

    } else {
      if (this.loginFirstModal) {
        this.modal = new bootstrap.Modal(this.loginFirstModal);
        this.modal.show();
      }
    }
  }
  
}
