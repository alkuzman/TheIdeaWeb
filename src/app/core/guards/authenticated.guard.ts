import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {AuthenticationService} from '../authentication/authentication.service';

/**
 * Created by Viki on 11/17/2016.
 */

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router, private snackBar: MatSnackBar) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    } else {
      this.snackBar.open('Login to see this page', undefined, <MatSnackBarConfig>{duration: 3000});
      this.router.navigate(['auth'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
