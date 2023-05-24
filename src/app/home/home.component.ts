import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {PadletListService} from "../shared/padlet-list.service";
import {PadletContainerService} from "../shared/padlet-container.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";


@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  constructor(public authService: AuthenticationService) {}
}

