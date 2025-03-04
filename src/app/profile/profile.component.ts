import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { HeaderComponent } from "../components/header/header.component";
import { HeaderTitleService } from '../services/header-title.service';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private headerTitleService: HeaderTitleService) {}

  updateHeaderTitleValue(givenTitle: string) {
    this.headerTitleService.updateHeaderTitle(givenTitle);
  }
  
  ngOnInit(): void {
    this.updateHeaderTitleValue("Profile");
  }
}
