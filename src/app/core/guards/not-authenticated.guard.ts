/**
 * Created by Viki on 11/17/2016.
 */
import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {JwtAuthenticationService} from "../authentication/jwt/jwt-authentication.service";
import {MdSnackBar} from "@angular/material";
/**
 * Created by Viki on 11/17/2016.
 */

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {

  constructor(private authenticationService: JwtAuthenticationService, private router: Router, private snackBar: MdSnackBar) {

  }

  canActivate() {
    if (this.authenticationService.isAuthenticated()) {
      this.snackBar.open("You are already authenticated", undefined, {duration: 3000});
      this.router.navigate(["home"]);
      return false;
    } else {
      return true;
    }
  }

}
