/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Routes} from "@angular/router";
import {AboutRoutes} from "../pages/about/index";
import {HomeRoutes} from "../pages/home/index";
import {PagesComponent} from "./pages.component";
import {NewProblemPageRoutes} from "./problem-pages/new-problem-page/new-problem-page.routes";
import {ProblemPagesRoutes} from "./problem-pages/problem-pages.routes";

export const PagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      ...HomeRoutes,
      ...AboutRoutes,
      ...ProblemPagesRoutes
    ]
  }
];
