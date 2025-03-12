import { Component } from '@angular/core';
import { LoginRegisterService } from '../../services/login-register/login-register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userName: string = "";
  userEmail: string = "";
  userPassword: string = "";
  message: SafeHtml = "";
  isError = false;
  
  constructor(
    private loginRegisterService: LoginRegisterService,
    private domSanitizer: DomSanitizer
  ) {}

  onSubmit() {
    if (this.userName != "", this.userEmail != "", this.userPassword != "") {

      const success = this.loginRegisterService.register(
        {
          userName: this.userName,
          userEmail: this.userEmail,
          userPassword: this.userPassword
        }
      );

      if (success) {
        this.message = this.domSanitizer.bypassSecurityTrustHtml('<div class="alert alert-success" role="alert"><i class="bi bi-check-circle"></i> Registration successful! Please login now...</div>');
        this.isError = false;
        // setTimeout(() => this.message = "", 3000);

        this.userName = "";
        this.userEmail = "";
        this.userPassword = "";

      } else {
        this.message = this.domSanitizer.bypassSecurityTrustHtml('<div class="alert alert-danger" role="alert"><i class="bi bi-exclamation-circle"></i> User email already exists! Try with different email...</div>');
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
