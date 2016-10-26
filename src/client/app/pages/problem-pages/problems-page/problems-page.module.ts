/**
 * Created by AKuzmanoski on 24/10/2016.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {ProblemModule} from "../../../core/problem/problem.module";
import {ProblemsPageComponent} from "./problems-page.component";
import {ProblemsPageRoutingModule} from "./problems-page-routing.module";
@NgModule({
  imports: [SharedModule.forRoot(), ProblemModule, ProblemsPageRoutingModule],
  declarations: [ProblemsPageComponent],
  exports: [ProblemsPageComponent]
})
export class ProblemsPageModule {

}
