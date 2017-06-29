import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ErrorHandlingService} from "../../core/error-handling/error-handling.service";
import {UserService} from "../../domain/services/user/user.service";
import {User} from "../../domain/model/authentication/user";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {Response} from "@angular/http";
import {NavigationService} from "../../core/navigation/navigation.service";
import {RedirectService} from "../../core/navigation/redirect.service";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {observable} from "rxjs/symbol/observable";
/**
 * Created by Viki on 2/11/2017.
 */

@Injectable()
export class ActivationResolverService implements Resolve<User> {

    mail: string;
    code: string;

    constructor(private errorHandlingService: ErrorHandlingService, private userService: UserService,
                private redirect: RedirectService, private snackBar: MdSnackBar) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
        this.code = route.queryParams['code'];
        this.mail = route.queryParams['user'];
        return this.userService.activateUser(this.code, this.mail).catch((error: any) => this.onError(error));
    }

    onError(error: Response): ErrorObservable | any {
        if (error.status === 410) {
            this.redirect.login({email: this.mail});
            this.snackBar.open("Your profile is already activated. You can login", undefined,
                <MdSnackBarConfig>{duration: 3000});
            return null
        } else if (error.status === 401) {
            this.redirect.login({email: this.mail});
            this.snackBar.open("Please try login", undefined,
                <MdSnackBarConfig>{duration: 3000});
            return null;
        }
        return this.errorHandlingService.handleError(error);
    }

}
