import { Routes } from '@angular/router';

import {MainNavComponent} from "./main-nav/main-nav.component"
import {mainRoutes} from "./main-nav/main-nav.routes"

export const routes: Routes = [
  {
    path: '',
    component: MainNavComponent,
    children: [
      ...mainRoutes
    ]
  }
];
