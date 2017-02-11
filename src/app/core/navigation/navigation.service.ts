import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {NavigationItem} from "./navigation-item";
import {Observable, Observer} from "rxjs";
import {JwtAuthenticationService} from "../authentication/jwt/jwt-authentication.service";
import {JwtHttpService} from "../authentication/jwt/jwt-http.service";
/**
 * Created by AKuzmanoski on 20/12/2016.
 */

@Injectable()
export class NavigationService {
  constructor(private http: JwtHttpService, private authenticationService: JwtAuthenticationService) {
  }

  public get navigationItems(): Observable<NavigationItem[]> {
    return Observable.create((observer: Observer<NavigationItem[]>) => {
      let navigationItems: NavigationItem[];

      this.http.get("/assets/data/navigation/navigation.json").subscribe((response: Response) => {
        navigationItems = response.json();

        if (this.authenticationService.isAuthenticated()) {
          this.http.get("/assets/data/navigation/signed-navigation.json").subscribe((response: Response) => {
            navigationItems = navigationItems.concat(response.json());
            observer.next(navigationItems);
          });
        } else {
          this.http.get("/assets/data/navigation/not-signed-navigation.json").subscribe((response: Response) => {
            navigationItems = navigationItems.concat(response.json());
            observer.next(navigationItems);
          });
        }

      });
    })
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
