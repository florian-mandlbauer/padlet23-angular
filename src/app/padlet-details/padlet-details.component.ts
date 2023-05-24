import {Component, OnInit} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {PadletListService} from "../shared/padlet-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {PadletContainer} from "../shared/padlet-container";
import {PadletContainerFactory} from "../shared/padlet-container-factory";
import {PadletContainerService} from "../shared/padlet-container.service";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})
export class PadletDetailsComponent implements OnInit {
  //@Input() padlet:Padlet | undefined;
  //@Output() showListEvent = new EventEmitter<any>();

  padlet: Padlet = PadletFactory.empty();
  padletContainer: PadletContainer = PadletContainerFactory.empty();

  constructor(private pl: PadletListService,
              private pc: PadletContainerService,
              private route: ActivatedRoute,
              private router: Router,
              public authService: AuthenticationService) {

  }

  ngOnInit() {
    // Auslesen des Parameters aus der jeweiligen Route

      const params = this.route.snapshot.params;
      const padletId = params['id']; // ID des Padlets
      const containerId = params['id']; // ID des PadletContainers

      this.pl.getSinglePadlet(padletId).subscribe((p: Padlet) => {
        this.padlet = p;
        this.pc.getContainerById(containerId).subscribe((c: PadletContainer) => {
          this.padletContainer = c;
        });
      });
    }

    /*
    showPadletList() {
      this.showListEvent.emit();
    }
     */

  getRating(num: number) {
    return new Array(num);
  }

  checkIfLoggedInUserIsNotEntryOwner() {
    if(this.authService.getCurrentUser().id === this.padlet.user.id || this.authService.getCurrentUser().isAdmin) {
      return true;
    } else {
      alert("Sie dürfen diesen Eintrag nicht bearbeiten, da sie nicht der Eigentümer dieses Eintrags bzw. ein Admin sind.");
      this.router.navigateByUrl(this.router.url);
      return false;
    }
  }

  removePadletEntry() {
    //console.log("Logged in User: " + this.authService.getCurrentUser().id);
    //console.log("Padlet-User-ID: " + this.padlet.user.id);

    if (this.authService.getCurrentUser().id === this.padlet.user.id || this.authService.getCurrentUser().isAdmin) {
      if (confirm('Wollen sie diesen Padlet-Entry wirklich löschen? (Wird von der DB entfernt!)')) {
        this.pl.removePadlet(this.padlet.id).subscribe(
          (res: any) => this.router.navigate(['../../'], { relativeTo: this.route })
        );
        //alert("Padlet-Eintrag wurde erfolgreich von der Datenbank gelöscht!");
      }
    } else {
      alert("Sie dürfen diesen Eintrag nicht löschen, da sie nicht der Eigentümer dieses Eintrags bzw. ein Admin sind.");
    }
  }

  /*
  padletEntrypadletContainerConnection(entry: Padlet, container: PadletContainer) {
    if(entry.user_id == container.user.id) {
      console.log("das stimmt");
      return true
    } else {
      console.log("No match");
      console.log(entry.user_id, container.user.id);
      return false;
    }
  }

  canEditAndDeletePadlet(): boolean {
    return this.authService.isLoggedIn() && this.authService.getCurrentUser().isAdmin;
  }
   */
}
