/**
 * Created by AKuzmanoski on 26/10/2016.
 */
/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProblemsPageRoutes} from "./problems-page.routes";

@NgModule({
  imports: [
    RouterModule.forChild(ProblemsPageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProblemsPageRoutingModule {
}
