/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {NgModule} from "@angular/core";
import {NewProblemPageComponent} from "./new-problem-page.component";
import {SharedModule} from "../../../shared/shared.module";
import {ProblemModule} from "../../../core/problem/problem.module";
@NgModule({
  imports: [SharedModule.forRoot(), ProblemModule],
  declarations: [NewProblemPageComponent],
  exports: [NewProblemPageComponent],
  providers: []
})
export class NewProblemPageModule {

}
