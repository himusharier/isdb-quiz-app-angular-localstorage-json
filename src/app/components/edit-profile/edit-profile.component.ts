import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRegisterService } from '../../services/login-register/login-register.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  message: SafeHtml = "";
  isError: boolean = false;
  // userName: string = "";

  @Input() userId!: string; 
  @Input() userName!: string; 
  @Input() userEmail!: string;

  constructor(
    private loginRegisterService: LoginRegisterService,
    private domSanitizer: DomSanitizer
  ) {}

  onUpdate() {
    const result = this.loginRegisterService.update(this.userId, this.userName);
    
    if (result) {
      this.isError = false;
      this.message = this.domSanitizer.bypassSecurityTrustHtml('<div class="alert alert-success" role="alert"><i class="bi bi-check-circle"></i> Profile updated successfully!</div>');
      setTimeout(() => {
        this.message = "",
        window.location.reload();
      }, 1000);

    } else {
      this.isError = true;
      this.message = this.domSanitizer.bypassSecurityTrustHtml('<div class="alert alert-danger" role="alert"><i class="bi bi-x-circle"></i> Error updating profile! Please try again...</div>');
      setTimeout(() => this.message = "", 3000);
    }
  }

}
