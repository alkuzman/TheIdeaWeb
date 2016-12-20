/**
 * Created by Viki on 11/17/2016.
 */
import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {JwtAuthenticationService} from "../authentication/jwt/jwt-authentication.service";
/**
 * Created by Viki on 11/17/2016.
 */

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {

  constructor(private authenticationService: JwtAuthenticationService, private router: Router) {

  }

  canActivate() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(["home"]);
      return false;
    } else {
      return true;
    }
  }

}
