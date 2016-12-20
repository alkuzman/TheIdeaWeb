import {Routes} from "@angular/router";
import {NewProblemPageRoutes} from "./new-problem-page/new-problem-page.routes";
import {ProblemPagesComponent} from "./problem-pages.component";
import {ProblemsPageRoutes} from "./problems-page/problems-page.routes";
import {AuthenticatedGuard} from "../../core/guards/authenticated.guard";
/**
 * Created by AKuzmanoski on 24/10/2016.
 */
export const ProblemPagesRoutes: Routes = [
  {
    path: '',
    component: ProblemPagesComponent,
    children: [
      {
        path: '',
        loadChildren: "app/pages/problem-pages/problems-page/problems-page.module#ProblemsPageModule",
        data: {preload: true}
      },
      {
        path: 'new',
        canActivate: [AuthenticatedGuard],
        loadChildren: "app/pages/problem-pages/new-problem-page/new-problem-page.module#NewProblemPageModule"
      },
      {
        path: ':id',
        loadChildren: "app/pages/problem-pages/problem-details-page/problem-details-page.module#ProblemDetailsPageModule"
      }

    ]
  }
];
