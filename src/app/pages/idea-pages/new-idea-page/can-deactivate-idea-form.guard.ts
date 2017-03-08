import {Injectable} from "@angular/core";
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {NewIdeaPageComponent} from "./new-idea-page-component";
import {Observable} from "rxjs";
/**
 * Created by AKuzmanoski on 27/02/2017.
 */
@Injectable()
export class CanDeactivateIdeaFormGuard implements CanDeactivate<NewIdeaPageComponent> {

  canDeactivate(component: NewIdeaPageComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return window.confirm("Do you want to discard your changes");
  }
}
