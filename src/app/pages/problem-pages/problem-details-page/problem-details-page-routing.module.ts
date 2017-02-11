import {RouterModule} from "@angular/router";
import {ProblemDetailsPageRoutes} from "./problem-details-page.rotues";
import {NgModule} from "@angular/core";
import {ProblemResolverService} from "./problem-resolver.service";
/**
 * Created by AKuzmanoski on 14/11/2016.
 */

@NgModule({
  imports: [
    RouterModule.forChild(ProblemDetailsPageRoutes)
  ],
  providers: [
    ProblemResolverService
  ],
  exports: [
    RouterModule
  ]
})
export class ProblemDetailsPageRoutingModule {
}
