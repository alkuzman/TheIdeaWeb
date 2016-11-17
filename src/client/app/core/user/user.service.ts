import {Injectable} from "@angular/core";
import {Http, Response, Headers, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {User} from "../model/authentication/user";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */

@Injectable()
export class UserService {
  private usersUrl: string = "/api/users";
  private loginUrl: string = "/api/auth/login";

  private loggedIn: boolean = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem("auth_token");
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
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
      .then(this.extractData)
      .catch(this.handleError);
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

  loginUser(user: User) {
    var body = {username: user.email, password: user.password};
    let url = this.loginUrl;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Requested-With', 'XMLHttpRequest');
    return this.http.post(url, body, {headers: headers})
      .map(this.extractLoginData)
      .catch(this.handleError)
  }

  private extractLoginData(res: Response) {
    let body = res.json();
    localStorage.setItem("auth_token", body.token);
    this.loggedIn = true;
    console.log(body);
    return body || {};
  }

  public logout() {
    localStorage.removeItem("auth_token");
    this.loggedIn = false;
  }

  public isLoggedIn() {
    return this.loggedIn;
  }
}
