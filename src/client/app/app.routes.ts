import {Routes} from "@angular/router";
import {AuthenticatedGuard} from "./core/guards/authenticated.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: "app/auth-pages/auth-pages.module#AuthPagesModule",
    canActivate: [AuthenticatedGuard]
  }
];
