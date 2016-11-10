import { Routes } from '@angular/router';

import {CoreComponent} from "./core/core.component"
import {PagesRoutes} from "./pages/pages.routes";
import {PagesComponent} from "./pages/pages.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: "/home"
  },
  {
    path: 'auth',
    loadChildren:"app/auth-pages/auth-pages.module#AuthPagesModule"
  },
  {
    path: "",
    loadChildren: "app/pages/pages.module#PagesModule"
  }
];
