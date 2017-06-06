import {Routes} from "@angular/router";
import {RegisterPageComponent} from "./register-page.component";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */
export const RegisterPageRoutes: Routes = [
  {
    path: '',
    component: RegisterPageComponent,
    data: {
      animation: {
        value: 'register',
      }
    }
  }
]
