import {Route} from "@angular/router";
import {AboutComponent} from "./index";

export const AboutRoutes: Route[] = [
  {
    path: '',
    component: AboutComponent,
    data: {
      animation: {
        value: 'about',
      }
    }
  }
];