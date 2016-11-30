import {Routes} from "@angular/router";
import {NewProblemPageRoutes} from "./new-problem-page/new-problem-page.routes";
import {ProblemPagesComponent} from "./problem-pages.component";
import {ProblemsPageRoutes} from "./problems-page/problems-page.routes";
import {LoggedInGuard} from "../../guards/logged-in.guard";
/**
 * Created by AKuzmanoski on 24/10/2016.
 */
export const ProblemPagesRoutes: Routes = [
  {
    path: '',
    component: ProblemPagesComponent,
    loadChildren: "app/pages/problem-pages/problems-page/problems-page.module#ProblemsPageModule"
  },
  {
    path: 'new',
    component: ProblemPagesComponent,
    canActivate: [LoggedInGuard],
    loadChildren: "app/pages/problem-pages/new-problem-page/new-problem-page.module#NewProblemPageModule"
  }
];
