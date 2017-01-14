import { Route } from '@angular/router';
import { HomeComponent } from './index';
import {CategoryResolverService} from "./category-resolver.service";

export const HomeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  }
];
