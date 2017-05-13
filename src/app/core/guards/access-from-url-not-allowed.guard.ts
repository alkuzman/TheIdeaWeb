import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
/**
 * Created by Viki on 5/13/2017.
 */


export class AccessFromUrlNotAllowedGuard implements CanActivate {

    allow: boolean = false;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.allow) {
            this.allow = !this.allow;
            return !this.allow;
        }
        return this.allow;
    }

}