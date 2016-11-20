import {Routes} from "@angular/router";
import {AuthenticatedGuard} from "./guards/authenticated.guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: "/home"
  },
  {
    path: 'auth',
    loadChildren: "app/auth-pages/auth-pages.module#AuthPagesModule",
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "",
    loadChildren: "app/pages/pages.module#PagesModule"
  }
];
