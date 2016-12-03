/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {NgModule} from "@angular/core";
import {NewProblemPageComponent} from "./new-problem-page.component";
import {SharedModule} from "../../../shared/shared.module";
import {ProblemModule} from "../../../domain/problem/problem.module";
import {NewProblemPageRoutingModule} from "./new-problem-page-routing.module";
@NgModule({
  imports: [SharedModule.forRoot(), ProblemModule, NewProblemPageRoutingModule],
  declarations: [NewProblemPageComponent],
  exports: [NewProblemPageComponent],
  providers: []
})
export class NewProblemPageModule {

}
