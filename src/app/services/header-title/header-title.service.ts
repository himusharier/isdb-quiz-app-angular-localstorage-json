import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderTitleService {

  headerTitle: string = "";

  updateHeaderTitle(newHeaderTitle: string) {
    this.headerTitle = newHeaderTitle;
  }
  
}
