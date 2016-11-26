import {Injectable} from "@angular/core";
import {Http, Response, Headers, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {User} from "../model/authentication/user";
import {Credentials} from "./helper/Credentials";
import {JwtAuthorizationService} from "../../shared/security/jwt/jwt-authorization.service";
import {JwtSecurityContext} from "../../shared/security/jwt/jwt-security-context.service";
import {UserObjectService} from "./user-object.service";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */

@Injectable()
export class UserService {
  private usersUrl: string = "/api/users";
  private loginUrl: string = "/api/auth/login";

  constructor(private http: Http, private jwtAuthorizationService: JwtAuthorizationService, private jwtSecurityContext: JwtSecurityContext, private userObjectService: UserObjectService) {
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    return Observable.throw(error);
  }

  getUserById(id: number): Observable<User> {
    let url = this.usersUrl + "/" + id;
    /*let params = new URLSearchParams();
     params.set('id', id.toString()); // the user's search value*/
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError)
  }

  addUser(user: User): Promise<User> {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.usersUrl, body, {headers: headers})
      .toPromise()
      .then(this.extractData);
  }

  getUserByEmail(email: string) {
    console.log("get user by email called");
    let url = this.usersUrl;
    let params = new URLSearchParams();
    params.set('email', email); // the user's search value*/
    return this.http.get(url, {search: params})
      .map(this.extractData)
      .catch(this.handleError)
  }

  loginUser(credentials: Credentials) {
    return this.jwtAuthorizationService.authenticate(credentials.user.email, credentials.user.password, credentials.rememberMe)
      .map((response: Response) => this.extractLoginData(response))
      .catch((error: any) => this.handleError(error));
  }

  private extractLoginData(res: Response) {
    let body = res.json();
    this.jwtSecurityContext.principal = this.userObjectService.user;
    this.userObjectService.removeUser();
    return body || {};
  }

  public logout(): void {
    this.jwtSecurityContext.clearSecurityContext();
  }

  public isLoggedIn(): boolean {
    return this.jwtSecurityContext.isAuthenticated();
  }

  public getAuthenticatedUser(): User {
    return this.jwtSecurityContext.principal;
  }
}
