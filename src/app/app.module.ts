import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PadletListComponent} from './padlet-list/padlet-list.component';
import {PadletListItemComponent} from './padlet-list-item/padlet-list-item.component';
import {PadletDetailsComponent} from './padlet-details/padlet-details.component';
import {PadletListService} from "./shared/padlet-list.service";
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PadletEntryFormComponent} from './padlet-entry-form/padlet-entry-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {LoginInterceptorService} from "./shared/login-interceptor.service";
import {registerLocaleData} from "@angular/common";
import localeDe from '@angular/common/locales/de';
import { PadletContainerListComponent } from './padlet-container-list/padlet-container-list.component';
import {User} from "./shared/user";

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletListItemComponent,
    PadletDetailsComponent,
    HomeComponent,
    PadletEntryFormComponent,
    LoginComponent,
    PadletContainerListComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, ReactiveFormsModule
  ],
  providers: [PadletListService, AuthenticationService,
    {
      provide: LOCALE_ID,
      useValue: 'de'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
