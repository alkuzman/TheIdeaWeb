import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {NavigationItem} from "./navigation-item";
import {Observable, Observer} from "rxjs";
import {JwtAuthenticationService} from "../authentication/jwt/jwt-authentication.service";
import {JwtHttpService} from "../authentication/jwt/jwt-http.service";
import {NavigationItemGroup} from "./navigation-item-group";
/**
 * Created by AKuzmanoski on 20/12/2016.
 */

@Injectable()
export class NavigationService {

  constructor(private http: JwtHttpService, private authenticationService: JwtAuthenticationService) {
  }

  public get navigation(): Observable<NavigationItemGroup[]> {
    return Observable.create((observer: Observer<NavigationItemGroup[]>) => {

      this.http.get("/assets/data/navigation/navigation.json").subscribe((response: Response) => {
        let newNavigation: NavigationItemGroup[] = [];
        let navigation: NavigationItemGroup[] = response.json();
        let authenticated: boolean = this.authenticationService.isAuthenticated();
        for (let navigationItemGroup of navigation) {
          let newNavigationItemGroup: NavigationItemGroup = {name: navigationItemGroup.name, items: [], divider: navigationItemGroup.divider};
          for (let navigationItem of navigationItemGroup.items) {
            if (navigationItem.scope == "authenticated" && !authenticated)
              continue;
            if (navigationItem.scope == "not-authenticated" && authenticated)
              continue;
            newNavigationItemGroup.items.push(navigationItem);
          }
          newNavigation.push(newNavigationItemGroup);
        }
        observer.next(newNavigation);
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
