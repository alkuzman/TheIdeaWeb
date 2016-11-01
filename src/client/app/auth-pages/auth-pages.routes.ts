import {Routes} from "@angular/router";
import {AuthPagesComponent} from "./components/auth-pages.component";
/**
 * Created by Viki on 10/28/2016.
 */


export const AuthPagesRoutes: Routes = [
  {
    path: "",
    component: AuthPagesComponent,
    loadChildren: "app/auth-pages/auth-page/auth-page.module#AuthPageModule"
  },
  {
    path: "register",
    component: AuthPagesComponent,
    loadChildren: "app/auth-pages/register-page/register-page.module#RegisterPageModule"
  }
]
