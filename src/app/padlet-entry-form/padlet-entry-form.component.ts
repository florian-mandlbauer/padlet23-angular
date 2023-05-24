import {Component, OnInit} from '@angular/core';
import {PadletFactory} from "../shared/padlet-factory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletListService} from "../shared/padlet-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletEntryFormErrorMessages} from "./padlet-entry-form-error-messages";
import {Padlet} from "../shared/padlet";
import {AuthenticationService} from "../shared/authentication.service";
import {PadletContainerFactory} from "../shared/padlet-container-factory";
import {PadletContainerService} from "../shared/padlet-container.service";
import {PadletContainer} from "../shared/padlet-container";


@Component({
  selector: 'bs-padlet-entry-form',
  templateUrl: './padlet-entry-form.component.html',
  styles: []
})
export class PadletEntryFormComponent implements OnInit {
  padlet = PadletFactory.empty();
  padletContainer = PadletContainerFactory.empty();
  padletEntryForm: FormGroup;
  isUpdatingPadletEntry = false;

  errors: { [key: string]: string } = {};

  constructor(private fb: FormBuilder,
              private pl: PadletListService,
              private pc: PadletContainerService,
              private route: ActivatedRoute,
              private router: Router) {
    this.padletEntryForm = this.fb.group({
    });
  }

  ngOnInit() {
    // Soll ein neues Padlet angelegt oder bestehender Entry editiert werden?
    const padletEntryId = this.route.snapshot.params["id"];
    if (padletEntryId) {
      // Editiere Padlet-Entry
      this.isUpdatingPadletEntry = true;
      this.pl.getSinglePadlet(padletEntryId).subscribe(padlet => {
        this.padlet = padlet;
        this.initPadletEntry();
      })
      this.pc.getContainerById(this.padletContainer.id).subscribe(padletContainer => {
        this.padletContainer = padletContainer;
      });
    }
    this.initPadletEntry();
  }

  initPadletEntry() {
    this.padletEntryForm = this.fb.group({
      id: this.padlet.id,
      title: [this.padlet.title, Validators.required],
      subtitle: this.padlet.subtitle,
      comment: this.padlet.comment,
      published: [this.padlet.published, Validators.required],
      rating: [this.padlet.rating, [Validators.min(0), Validators.max(10)]],
    });

    this.padletEntryForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    })
  }

  updateErrorMessages() {
    this.errors = {}; // Clears recent error messages
    for (const message of PadletEntryFormErrorMessages) {
      const control = this.padletEntryForm.get(message.forControl);

      // PUTS OUT ERROR MESSAGE IF DEFINED INPUT VALUE IS NOT GIVEN
      if (control && control.dirty && control.invalid && control.errors
        && control.errors[message.forValidator] && !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    console.log(this.padletEntryForm.value);
    const padlet: Padlet = PadletFactory.fromObject(this.padletEntryForm.value); // NEW PADLET ENTRY

    padlet.user = this.padlet.user; // Assign users to Padlet-Entry
    //this.padletContainer.id = this.padletEntryForm.value.id; // Assign container ID to Padlet-Entry

    if (this.isUpdatingPadletEntry) {
      this.pl.updatePadlet(padlet).subscribe(res => {
        //this.router.navigate(["/padletcontainers", this.padletContainer.id], {relativeTo: this.route})
        alert("Padlet-Entry wurde aktualisiert.");
      });
    } else {
      padlet.user_id = 1;
      //padlet.user_id = sessionStorage.getItem("userId");

      this.pl.createPadlet(padlet).subscribe(res=>{
        this.padlet = PadletFactory.empty();
        this.padletEntryForm.reset(PadletFactory.empty());
        this.router.navigate(["../padletcontainers"], {relativeTo: this.route});
      });
    }
  }

  navigateToPadletEntries(padletId: number): void {
    this.router.navigate(['/padletcontainers/{id}', padletId]);
  }
}
