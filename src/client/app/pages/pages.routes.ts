/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";
import {HomeRoutes} from "./home/home.routes";

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
        children: [
          ...HomeRoutes
        ]
      },
      {
        path: 'problems',
        loadChildren: "app/pages/problem-pages/problem-pages.module#ProblemPagesModule",
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
        path: 'announcements',
        loadChildren: 'app/pages/announcement-pages/announcement-pages.module#AnnouncementPagesModule'
      },
      {
        path: 'search',
        loadChildren: 'app/pages/search-pages/search-pages.module#SearchPagesModule'
      }]
  }
];
