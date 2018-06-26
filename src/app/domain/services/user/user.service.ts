import {Observable} from 'rxjs';

import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {User} from '../../model/authentication';
import {Credentials} from '../../user/helper/Credentials';
import {UserObjectService} from './user-object.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import {UserContext} from '../../user/security-context/user-context';

/**
 * Created by AKuzmanoski on 29/10/2016.
 */

@Injectable()
export class UserService {
  private usersUrl = '/api/users';

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService,
              private userObjectService: UserObjectService,
              private userContext: UserContext) {
  }

  getUserById(id: number): Observable<User> {
    const url = this.usersUrl + '/' + id;
    return this.http.get<User>(url);
  }

  activateUser(code: string, mail: string): Observable<User> {
    const url = this.usersUrl + '/activation?code=' + code + '&user=' + mail;
    return this.http.get<User>(url);
  }

  resendActivationCode(email: string): Observable<void> {
    const url = this.usersUrl + '/activationCode?email=' + email;
    return this.http.get<void>(url);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

  getUserByEmail(email: string): Observable<User> {
    const url = this.usersUrl;
    let params = new HttpParams();
    params = params.set('email', email); // the user-pages's search value*/
    console.log(params);
    return this.http.get<User>(url, {params: params});
  }

  loginUser(credentials: Credentials) {
    return this.authenticationService.authenticate(credentials.user.email, credentials.user.password, credentials.rememberMe).pipe(
      tap((response: any) => this.onLogin(response)));
  }

  public logout(): void {
    this.authenticationService.signOut();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  public getAuthenticatedUser(): User {
    return this.userContext.get();
  }

  public getAuthenticatedUserObservable(): Observable<User> {
    return this.userContext.getObservable();
  }

  private onLogin(res: any) {
    this.userObjectService.removeUser();
  }
}
