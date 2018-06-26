import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {User} from '../../domain/model/authentication';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserObjectService} from '../../domain/services/user/user-object.service';
import {UserService} from '../../domain/services/user/user.service';
import {ErrorHandlingService} from '../../core/error-handling/error-handling.service';
import {catchError} from 'rxjs/operators';

/**
 * Created by Viki on 5/15/2017.
 */


@Injectable()
export class VerificationResolverService implements Resolve<User> {

  constructor(private userObjectService: UserObjectService,
              private errorHandlingService: ErrorHandlingService,
              private userService: UserService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    const email: string = route.queryParams['email'];
    if (this.userObjectService.user != null && this.userObjectService.user.email === email) {
      return this.userObjectService.user;
    }
    return this.userService.getUserByEmail(email).pipe(catchError((error: any) =>
      this.errorHandlingService.handleError(error)));
  }
}
