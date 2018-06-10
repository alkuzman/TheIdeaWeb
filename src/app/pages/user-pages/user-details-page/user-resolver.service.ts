import {catchError} from 'rxjs/operators';
/**
 * Created by AKuzmanoski on 05/01/2017.
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {User} from '../../../domain/model/authentication';
import {Observable} from 'rxjs';
import {UserService} from '../../../domain/services/user/user.service';
import {ErrorHandlingService} from '../../../core/error-handling/error-handling.service';

@Injectable()
export class UserResolverService implements Resolve<User> {
  constructor(private userService: UserService, private errorHandlingService: ErrorHandlingService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User>|Promise<User>|User {
    const userId: number = +route.params["id"];
    return this.userService.getUserById(userId).pipe(catchError((error: any) => this.errorHandlingService.handleError(error)));
  }
}
