import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {User} from "../model/authentication/user";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */

@Injectable()
export class UserService {
  private usersUrl: string = "/api/users";
  private loginUrl: string = "/api/doLogin";

  constructor(private http: Http) {

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
    let url = this.loginUrl;
    let params = new URLSearchParams();
    params.set('username', user.email);
    params.set('password', user.password);
    return this.http.get(url, {search: params})
      .map(this.extractData)
      .catch(this.handleError)
  }
}
