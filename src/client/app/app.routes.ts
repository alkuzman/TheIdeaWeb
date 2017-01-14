import {Routes} from "@angular/router";
import {NotAuthenticatedGuard} from "./core/guards/not-authenticated.guard";
import {PagesRoutes} from "./pages/pages.routes";

export const routes: Routes = [
  {
    path: "",
    children: [
      ...PagesRoutes
    ]
  },
  {
    path: 'auth',
    loadChildren: "app/auth-pages/auth-pages.module#AuthPagesModule"
  },
  {
    path: 'errors',
    loadChildren: "app/error-pages/error-pages.module#ErrorPagesModule"
  },
  {
    path: '**',
    redirectTo: "/errors/page-not-found"
  }
];
