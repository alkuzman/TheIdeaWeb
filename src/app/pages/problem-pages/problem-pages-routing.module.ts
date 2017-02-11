/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProblemPagesRoutes} from "./problem-pages.routes";

@NgModule({
  imports: [
    RouterModule.forChild(ProblemPagesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProblemPagesRoutingModule {
}
