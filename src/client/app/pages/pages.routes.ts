/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";

export const PagesRoutes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: "/home"
  },
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: 'about',
        loadChildren: "app/pages/about/about.module#AboutModule"
      },
      {
        path: 'home',
        loadChildren: "app/pages/home/home.module#HomeModule",
        data: {preload: true}
      },
      {
        path: 'problems',
        loadChildren: "app/pages/problem-pages/problem-pages.module#ProblemPagesModule",
        data: {preload: true}
      },
      {
        path: 'ideas',
        loadChildren: "app/pages/idea-pages/idea-pages.module#IdeaPagesModule"
      },
      {
        path: 'users',
        loadChildren: 'app/pages/user-pages/user-pages.module#UserPagesModule'
      },
      {
        path: '**',
        redirectTo: "/home"
      }]
  }
];
