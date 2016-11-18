import {RouterModule} from "@angular/router";
import {ProblemDetailsPageRoutes} from "./problem-details-page.rotues";
import {NgModule} from "@angular/core";
/**
 * Created by AKuzmanoski on 14/11/2016.
 */

@NgModule({
  imports: [
    RouterModule.forChild(ProblemDetailsPageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProblemDetailsPageRoutingModule {
}
