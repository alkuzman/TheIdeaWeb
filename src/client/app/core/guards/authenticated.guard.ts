import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {JwtAuthenticationService} from "../authentication/jwt/jwt-authentication.service";
/**
 * Created by Viki on 11/17/2016.
 */

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(private authenticationService: JwtAuthenticationService, private router: Router) {

  }

  canActivate() {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(["auth"]);
      return false;
    }
  }

}
