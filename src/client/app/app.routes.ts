import {Routes} from "@angular/router";
import {NotAuthenticatedGuard} from "./core/guards/not-authenticated.guard";

export const routes: Routes = [
  {
    path: "",
    loadChildren: "app/pages/pages.module#PagesModule"
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
