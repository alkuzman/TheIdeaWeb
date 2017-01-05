import {Routes} from "@angular/router";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
/**
 * Created by AKuzmanoski on 04/01/2017.
 */
export const ErrorPagesRoutes: Routes = [
  {
    path: "page-not-found",
    component: PageNotFoundComponent
  }
];
