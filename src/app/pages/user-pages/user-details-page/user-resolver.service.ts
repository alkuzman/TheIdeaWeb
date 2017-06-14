/**
 * Created by AKuzmanoski on 05/01/2017.
 */
import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {User} from "../../../domain/model/authentication/user";
import {Observable} from "rxjs";
import {UserService} from "../../../domain/services/user/user.service";
import {ErrorHandlingService} from "../../../core/error-handling/error-handling.service";
@Injectable()
export class UserResolverService implements Resolve<User> {
  constructor(private userService: UserService, private errorHandlingService: ErrorHandlingService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User>|Promise<User>|User {
    let userId: number = +route.params["id"];
    return this.userService.getUserById(userId).catch((error: any) => this.errorHandlingService.handleError(error));
  }
}
