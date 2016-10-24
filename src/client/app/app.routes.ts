import { Routes } from '@angular/router';

import {CoreComponent} from "./core/core.component"
import {PagesRoutes} from "./pages/pages.routes";
import {PagesComponent} from "./pages/pages.component";

export const routes: Routes = [
  ...PagesRoutes
];
