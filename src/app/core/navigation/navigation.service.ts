import {Observable, Observer} from 'rxjs';
import {Injectable} from '@angular/core';
import {NavigationItemGroup} from './navigation-item-group';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication.service';

/**
 * Created by AKuzmanoski on 20/12/2016.
 */

@Injectable()
export class NavigationService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }

  public get navigation(): Observable<NavigationItemGroup[]> {
    return Observable.create((observer: Observer<NavigationItemGroup[]>) => {
      this.http.get<NavigationItemGroup[]>('/assets/data/navigation/navigation.json').subscribe((navigation: NavigationItemGroup[]) => {
        const newNavigation: NavigationItemGroup[] = [];
        const authenticated: boolean = this.authenticationService.isAuthenticated();
        for (const navigationItemGroup of navigation) {
          const newNavigationItemGroup: NavigationItemGroup = {
            name: navigationItemGroup.name,
            items: [],
            divider: navigationItemGroup.divider
          };
          for (const navigationItem of navigationItemGroup.items) {
            if (navigationItem.scope === 'authenticated' && !authenticated) {
              continue;
            }
            if (navigationItem.scope === 'not-authenticated' && authenticated) {
              continue;
            }
            newNavigationItemGroup.items.push(navigationItem);
          }
          newNavigation.push(newNavigationItemGroup);
        }
        observer.next(newNavigation);
      });
    });
  }
}
