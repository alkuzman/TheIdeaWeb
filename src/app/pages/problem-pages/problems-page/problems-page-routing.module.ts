/**
 * Created by AKuzmanoski on 26/10/2016.
 */
/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProblemsPageRoutes} from "./problems-page.routes";
import {ProblemListResolverService} from "./problem-list-resolver.service";

@NgModule({
  imports: [
    RouterModule.forChild(ProblemsPageRoutes)
  ],
  providers: [
    ProblemListResolverService
  ],
  exports: [
    RouterModule
  ]
})
export class ProblemsPageRoutingModule {
}
