import { Component } from '@angular/core';
import {Padlet} from "./shared/padlet";
import {AuthenticationService} from "./shared/authentication.service";

// <bs-padlet-list *ngIf="listOn" (showDetailsEvent)="showDetails($event)"></bs-padlet-list>
//   <bs-padlet-details *ngIf="detailsOn" [padlet]="padlet" (showListEvent)="showList()"></bs-padlet-details>
@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  constructor(public authService: AuthenticationService) {

  }

  getLoginLabel() {
    if(this.authService.isLoggedIn()) {
      return "Logout"
    } else {
      return "Login"
    }
  }

  getUserName(){
    return this.authService.getCurrentUser().name;
  }

  getAdminValue(): boolean {
    if (this.authService.getCurrentUser().isAdmin) {
      return true;
    } else {
      return false;
    }
  }
}
