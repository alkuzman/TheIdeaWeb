import {Injectable} from "@angular/core";
import {Response, Headers, URLSearchParams} from "@angular/http";
import {User} from "../../model/authentication/user";
import {Credentials} from "../../user/helper/Credentials";
import {JwtAuthenticationService} from "../../../core/authentication/jwt/jwt-authentication.service";
import {JwtSecurityContext} from "../../../core/authentication/jwt/jwt-security-context.service";
import {UserObjectService} from "./user-object.service";
import {Observable} from "rxjs";
import {JwtHttpService} from "../../../core/authentication/jwt/jwt-http.service";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */

@Injectable()
export class UserService {
    private usersUrl: string = "/api/users";
    private loginUrl: string = "/api/auth/login";

    constructor(private http: JwtHttpService, private jwtAuthenticationService: JwtAuthenticationService,
                private jwtSecurityContext: JwtSecurityContext, private userObjectService: UserObjectService) {
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
         params.set('id', id.toString()); // the user-pages's search value*/
        return this.http.get(url)
            .map((response: Response) => this.extractData(response))
            .catch((error: any) => this.handleError(error));
    }

    activateUser(code: string, mail: string): Observable<User> {
        let url = this.usersUrl + "/activation?code=" + code + "&user=" + mail;
        return this.http.get(url)
            .map((response: Response) => this.extractData(response))
            .catch((error: any) => this.handleError(error));
    }

    resendActivationCode(email: string): Observable<void> {
        let url = this.usersUrl + "/activationCode?email=" + email;
        return this.http.get(url)
            .map((response: Response) => this.extractData(response))
            .catch((error: any) => this.handleError(error));
    }

    addUser(user: User): Promise<User> {
        let body = JSON.stringify(user);
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.usersUrl, body, {headers: headers})
            .toPromise()
            .then((response: Response) => this.extractData(response))
            .catch((error: any) => this.handleError(error));
    }

    getUserByEmail(email: string) {
        let url = this.usersUrl;
        let params = new URLSearchParams();
        params.set('email', email); // the user-pages's search value*/
        return this.http.get(url, {search: params})
            .map((response: Response) => this.extractData(response))
            .catch((error: any) => this.handleError(error));
    }

    loginUser(credentials: Credentials) {
        return this.jwtAuthenticationService.authenticate(credentials.user.email, credentials.user.password, credentials.rememberMe)
            .map((response: Response) => this.extractLoginData(response))
            .catch((error: any) => this.handleError(error));
    }

    private extractLoginData(res: Response) {
        let body = res.json();
        //this.jwtSecurityContext.securityProfileEncryption = body.securityProfileEncryption;
        //this.jwtSecurityContext.securityProfileSigning = body.securityProfileSigning;
        this.jwtSecurityContext.securityProfile = body.securityProfile;
        this.jwtSecurityContext.principal = this.userObjectService.user;
        this.userObjectService.removeUser();
        return body || {};
    }

    public logout(): void {
        this.jwtAuthenticationService.signOut();
    }

    public isLoggedIn(): boolean {
        return this.jwtSecurityContext.isAuthenticated();
    }

    public getAuthenticatedUser(): User {
        return this.jwtSecurityContext.principal;
    }

    public getAuthenticatedUserObservable(): Observable<User> {
        return this.jwtAuthenticationService.userObservable();
    }
}
