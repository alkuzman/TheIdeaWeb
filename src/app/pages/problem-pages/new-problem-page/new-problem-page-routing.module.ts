/**
 * Created by AKuzmanoski on 26/10/2016.
 */
/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NewProblemPageRoutes} from "./new-problem-page.routes";

@NgModule({
  imports: [
    RouterModule.forChild(NewProblemPageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class NewProblemPageRoutingModule {
}
