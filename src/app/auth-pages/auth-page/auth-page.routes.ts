import {Routes} from "@angular/router";
import {AuthPageComponent} from "./components/auth-page.component";
/**
 * Created by Viki on 10/29/2016.
 */

export const AuthPageRoutes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    data: {
      animation: {
        value: 'auth',
      }
    }
  }
];
