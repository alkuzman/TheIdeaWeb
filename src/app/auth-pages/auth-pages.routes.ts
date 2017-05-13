import {Routes} from "@angular/router";
import {AuthPagesComponent} from "./components/auth-pages.component";
import {RegisterPageRoutes} from "./register-page/register-page.routes";
import {LoginPageRoutes} from "./login-page/login-page-routes";
import {AuthPageRoutes} from "./auth-page/auth-page.routes";
import {LogoutPageRoutes} from "./logout-page/logout-page.routes";
import {NotAuthenticatedGuard} from "../core/guards/not-authenticated.guard";
import {AuthenticatedGuard} from "../core/guards/authenticated.guard";
import {ActivatePageRoutes} from "./activate-page/activate-page.routes";
import {VerifyPageComponent2} from "./activate-page/activate2";
import {VerifyPageComponent} from "./verify-page/components/verify-page.component";
import {VerifyPageRoutes} from "./verify-page/verify-page.routes";
import {AccessFromUrlNotAllowedGuard} from "../core/guards/access-from-url-not-allowed.guard";
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
        path: "activate",
        children: [...ActivatePageRoutes],
        canActivate: [NotAuthenticatedGuard]
      },
      {
        path: "verify",
        children: [...VerifyPageRoutes],
        canActivate: [NotAuthenticatedGuard, AccessFromUrlNotAllowedGuard]
      }
    ]
  }
]
