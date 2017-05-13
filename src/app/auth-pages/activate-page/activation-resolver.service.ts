import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ErrorHandlingService} from "../../core/error-handling/error-handling.service";
import {UserService} from "../../domain/services/user/user.service";
import {User} from "../../domain/model/authentication/user";
/**
 * Created by Viki on 2/11/2017.
 */

@Injectable()
export class ActivationResolverService implements Resolve<User> {

  constructor(private errorHandlingService: ErrorHandlingService, private userService: UserService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User>|Promise<User>|User {
    let code: string = route.queryParams['code'];
    return this.userService.activateUser(code).toPromise().catch((error: any) =>
      this.errorHandlingService.handleError(error));
  }

}
