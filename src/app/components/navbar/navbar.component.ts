import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisterComponent } from "../register/register.component";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RegisterComponent, LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
