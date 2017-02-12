import {Routes} from "@angular/router";
import {AuthPagesComponent} from "./components/auth-pages.component";
import {RegisterPageRoutes} from "./register-page/register-page.routes";
import {LoginPageRoutes} from "./login-page/login-page-routes";
import {AuthPageRoutes} from "./auth-page/auth-page.routes";
import {LogoutPageRoutes} from "./logout-page/logout-page.routes";
import {NotAuthenticatedGuard} from "../core/guards/not-authenticated.guard";
import {AuthenticatedGuard} from "../core/guards/authenticated.guard";
import {VerifyPageRoutes} from "./verify-page/verify-page.routes";
/**
 * Created by Viki on 10/28/2016.
 */
export const AuthPagesRoutes: Routes = [
  {

    path: "",
    component: AuthPagesComponent,
    children: [
      {
        path: "",
        children: [...AuthPageRoutes],
        canActivate: [NotAuthenticatedGuard]
      },
      {
        path: "register",
        children: [...RegisterPageRoutes],
        canActivate: [NotAuthenticatedGuard]
      },
      {
        path: "login",
        children: [...LoginPageRoutes],
        canActivate: [NotAuthenticatedGuard]
      },
      {
        path: "logout",
        children: [...LogoutPageRoutes],
        canActivate: [AuthenticatedGuard]
      },
      {
        path: "verify",
        children: [...VerifyPageRoutes],
        canActivate: [NotAuthenticatedGuard]
      }
    ]
  }
]
