import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "./shared/authentication.service";

@Injectable()
export class CanNavigateToAdminGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean { if (this.authService.isLoggedIn()) {
    return true;
  } else {
    alert(
      "Sie müssen Sich einloggen, um den Administrationsbereich zu betreten!"
    );
    console.log(state);
    this.router.navigate(["../"], { relativeTo: this.route }); return false;
  } }
}
