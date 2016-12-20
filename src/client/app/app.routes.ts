import {Routes} from "@angular/router";
import {NotAuthenticatedGuard} from "./core/guards/not-authenticated.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: "app/auth-pages/auth-pages.module#AuthPagesModule"
  }
];
