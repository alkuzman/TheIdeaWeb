import {Routes} from "@angular/router";
import {NewProblemPageRoutes} from "./new-problem-page/new-problem-page.routes";
import {ProblemPagesComponent} from "./problem-pages.component";
import {ProblemsPageRoutes} from "./problems-page/problems-page.routes";
/**
 * Created by AKuzmanoski on 24/10/2016.
 */
export const ProblemPagesRoutes: Routes = [
  {
    path: 'problems',
    component: ProblemPagesComponent,
    children: [
      ...NewProblemPageRoutes,
      ...ProblemsPageRoutes
    ]
  }
];
