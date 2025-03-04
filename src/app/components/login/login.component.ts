import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRegisterService } from '../../services/login-register/login-register.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userEmail: string = "";
  userPassword: string = "";
  message: SafeHtml = "";
  isError: boolean = false;

  constructor(
    private loginRegisterService: LoginRegisterService,
    private domSanitizer: DomSanitizer
  ) {}

  onSubmit() {
    if (this.userEmail != "", this.userPassword != "") {
      if (this.loginRegisterService.login(this.userEmail, this.userPassword)) {
        this.message = this.domSanitizer.bypassSecurityTrustHtml('<div class="alert alert-success" role="alert"><i class="bi bi-check-circle"></i> Login successful...</div>');
        this.isError = false;
        setTimeout(() => this.message = "", 3000);
        
        this.userEmail = "";
        this.userPassword = "";

      } else {
        this.message = this.message = this.domSanitizer.bypassSecurityTrustHtml('<div class="alert alert-danger" role="alert"><i class="bi bi-exclamation-circle"></i> Invalid credentials! Try again...</div>');
        this.isError = true;
        setTimeout(() => this.message = "", 3000);
      }

    } else {
      this.message = this.domSanitizer.bypassSecurityTrustHtml('<div class="alert alert-danger" role="alert"><i class="bi bi-x-circle"></i> Fill the form correctly!</div>');
      this.isError = true;
      setTimeout(() => this.message = "", 3000);
    }

  }

}
