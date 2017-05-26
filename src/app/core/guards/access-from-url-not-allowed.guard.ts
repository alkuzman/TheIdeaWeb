import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
/**
 * Created by Viki on 5/13/2017.
 */

@Injectable()
export class AccessFromUrlNotAllowedGuard implements CanActivate {

    constructor(private router: Router) {}

    allow: boolean = false;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.allow) {
            this.allow = !this.allow;
            return !this.allow;
        }
        this.router.navigate(["/home"]);
        return this.allow;
    }

}