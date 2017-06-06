import {Routes} from "@angular/router";
import {LoginPageComponent} from "./components/login-page.component";
/**
 * Created by Viki on 11/1/2016.
 */

export const LoginPageRoutes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    data: {
      animation: {
        value: 'login',
      }
    }
  }
];
