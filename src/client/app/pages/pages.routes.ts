/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";

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
    path: 'organizations',
    component: PagesComponent,
    loadChildren: "app/pages/organization-pages/organization-pages.module#OrganizationPagesModule"
  },
  {
    path: '**',
    redirectTo: "/home"
  }
];
