/**
 * Created by Viki on 11/17/2016.
 */
import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserService} from "../core/user/user.service";
/**
 * Created by Viki on 11/17/2016.
 */

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {

  }

  canActivate() {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(["home"]);
      return false;
    } else {
      return true;
    }
  }

}
