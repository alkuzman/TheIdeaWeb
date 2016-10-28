/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Routes} from "@angular/router";
import {AboutRoutes} from "../pages/about/index";
import {HomeRoutes} from "../pages/home/index";
import {PagesComponent} from "./pages.component";
import {ProblemPagesRoutes} from "./problem-pages/problem-pages.routes";
import {IdeaPagesRoutes} from "./idea-pages/idea-pages.routes";

export const PagesRoutes: Routes = [
  {
    path: 'about',
    component: PagesComponent,
    loadChildren: "app/pages/about/about.module#AboutModule"
  },
  {
    path: 'home',
    component: PagesComponent,
    loadChildren: "app/pages/home/home.module#HomeModule"
  },
  {
    path: 'problems',
    component: PagesComponent,
    loadChildren: "app/pages/problem-pages/problem-pages.module#ProblemPagesModule"
  },
  {
    path: 'ideas',
    component: PagesComponent,
    loadChildren: "app/pages/idea-pages/idea-pages.module#IdeaPagesModule"
  },
  {
    path: 'auth',
    component: PagesComponent,
    loadChildren:"app/pages/auth-pages/auth-pages.module#AuthPagesModule"
  },
  {
    path: '**',
    redirectTo: "/home"
  }
];
