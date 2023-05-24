
import {Component, OnInit} from '@angular/core';
import { PadletContainerService } from '../shared/padlet-container.service';
import {PadletContainer} from "../shared/padlet-container";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";


@Component({
  selector: 'bs-padlet-container-list',
  templateUrl: './padlet-container-list.component.html',
  styles: [
  ]
})
export class PadletContainerListComponent implements OnInit {
  containers: PadletContainer[] = [];

  constructor(private padletContainerService: PadletContainerService, private router: Router,
              public authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.loadContainers();
  }

  loadContainers(): void {
    this.padletContainerService.getContainers().subscribe(
      (response) => {
        this.containers = response;
      },
      (error) => {
        console.error('Failed to load PadletContainers:', error);
      }
    );
  }

  navigateToPadletList(containerId: number): void {
    this.router.navigate(['/padletcontainers', containerId]);
  }

  isPublicContainer(container: PadletContainer): boolean {
    return container.isPublic;
  }

  shouldDisplayContainer(container: PadletContainer): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser.isAdmin) {
      return true; // Zeige alle Container für Admin-Benutzer
    } else {
      return container.isPublic; // Zeige nur öffentliche Container für Nicht-Admin-Benutzer
    }
  }

  displayContainerOfLoggedInUser(container: PadletContainer): boolean {
    const currentUser = this.authService.getCurrentUser();
    return (
      this.authService.isLoggedIn() &&
      container.user.id === currentUser.id
    );
  }
}



