/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {NewProblemComponent} from "./new-problem.component";
import {ProblemModule} from "../../core/problem/problem.module";
@NgModule({
  imports: [SharedModule.forRoot(), ProblemModule],
  declarations: [NewProblemComponent],
  exports: [NewProblemComponent],
  providers: []
})
export class NewProblemModule {

}
