import {Routes} from "@angular/router";
import {AuthPagesComponent} from "./components/auth-pages.component";
import {RegisterPageRoutes} from "./register-page/register-page.routes";
import {LoginPageRoutes} from "./login-page/login-page-routes";
import {AuthPageComponent} from "./auth-page/components/auth-page.component";
import {LogoutPageRoutes} from "./logout-page/logout-page.routes";
import {NotAuthenticatedGuard} from "../core/guards/not-authenticated.guard";
import {AuthenticatedGuard} from "../core/guards/authenticated.guard";
import {ActivatePageRoutes} from "./activate-page/activate-page.routes";
import {VerifyPageComponent2} from "./activate-page/activate2";
import {VerifyPageComponent} from "./verify-page/components/verify-page.component";
import {VerifyPageRoutes} from "./verify-page/verify-page.routes";
import {AccessFromUrlNotAllowedGuard} from "../core/guards/access-from-url-not-allowed.guard";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {LoginPageComponent} from "./login-page/components/login-page.component";
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
        component: AuthPageComponent,
        canActivate: [NotAuthenticatedGuard],
        data: {
          animation: {
            value: 'auth',
          }
        }
      },
      {
        path: "register",
        component: RegisterPageComponent,
        canActivate: [NotAuthenticatedGuard],
        data: {
          animation: {
            value: 'register',
          }
        }
      },
      {
        path: "login",
        component: LoginPageComponent,
        canActivate: [NotAuthenticatedGuard],
        data: {
          animation: {
            value: 'login',
          }
        }
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
