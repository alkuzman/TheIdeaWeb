import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {JwtAuthenticationService} from "../authentication/jwt/jwt-authentication.service";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
/**
 * Created by Viki on 11/17/2016.
 */

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(private authenticationService: JwtAuthenticationService, private router: Router, private snackBar: MdSnackBar) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    } else {
      this.snackBar.open("Login to see this page", undefined, <MdSnackBarConfig>{duration: 3000});
      this.router.navigate(["auth"], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
