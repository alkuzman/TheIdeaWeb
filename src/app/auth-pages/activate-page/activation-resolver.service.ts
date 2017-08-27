import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ErrorHandlingService} from "../../core/error-handling/error-handling.service";
import {UserService} from "../../domain/services/user/user.service";
import {User} from "../../domain/model/authentication/user";
import {Response} from "@angular/http";
import {RedirectService} from "../../core/navigation/redirect.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

/**
 * Created by Viki on 2/11/2017.
 */

@Injectable()
export class ActivationResolverService implements Resolve<User> {

  mail: string;
  code: string;

  constructor(private errorHandlingService: ErrorHandlingService, private userService: UserService,
              private redirect: RedirectService, private snackBar: MatSnackBar) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    this.code = route.queryParams['code'];
    this.mail = route.queryParams['user'];
    return this.userService.activateUser(this.code, this.mail).catch((error: any) => this.onError(error));
  }

  onError(error: Response) {
    if (error.status === 410) {
      this.redirect.login({email: this.mail});
      this.snackBar.open("Your profile is already activated. You can login", undefined,
        <MatSnackBarConfig>{duration: 3000});
      return null;
    } else if (error.status === 401) {
      this.redirect.login({email: this.mail});
      this.snackBar.open("Please try login", undefined,
        <MatSnackBarConfig>{duration: 3000});
      return null;
    }
    return this.errorHandlingService.handleError(error);
  }

}
