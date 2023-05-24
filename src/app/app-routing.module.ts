import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {PadletDetailsComponent} from "./padlet-details/padlet-details.component";
import {PadletEntryFormComponent} from "./padlet-entry-form/padlet-entry-form.component";
import {LoginComponent} from "./login/login.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";
import {PadletContainerListComponent} from "./padlet-container-list/padlet-container-list.component";

// URLs in Angular, um Seiten direkt aufrufen zu können
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'padletcontainers', component: PadletContainerListComponent},
  {path: 'padletcontainers/:id', component: PadletListComponent},
  {path: 'padletcontainers/:id/:id', component: PadletDetailsComponent },

  {path: 'padlets', component: PadletListComponent},
  {path: 'padlets/:id', component: PadletDetailsComponent},
  {path: 'admin', component: PadletEntryFormComponent, canActivate: [CanNavigateToAdminGuard]},
  {path: 'padletcontainers/admin/:id/:id', component: PadletEntryFormComponent,  canActivate: [CanNavigateToAdminGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToAdminGuard]
})
export class AppRoutingModule { }
