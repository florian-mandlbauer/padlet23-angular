import {Component, OnInit} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {PadletListService} from "../shared/padlet-list.service";
import {PadletContainerService} from "../shared/padlet-container.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'bs-padlet-list',
  templateUrl: './padlet-list.component.html',
})

export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];
  // @Output() showDetailsEvent = new EventEmitter<Padlet>();

  // NEW
  constructor(private pl:PadletListService, private padletContainerService: PadletContainerService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    const padletContainerId = this.route.snapshot.params["id"];
    console.log("Container-ID: " + padletContainerId);
    this.padletContainerService.getContainerById(padletContainerId).subscribe(
      res => this.padlets = res.padlets
    );
  }

  protected readonly String = String;
}
