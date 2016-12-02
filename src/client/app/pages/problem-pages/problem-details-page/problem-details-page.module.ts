/**
 * Created by AKuzmanoski on 14/11/2016.
 */
import {NgModule} from "@angular/core";
import {ProblemModule} from "../../../core/problem/problem.module";
import {SharedModule} from "../../../shared/shared.module";
import {ProblemDetailsPageRoutingModule} from "./problem-details-page-routing.module";
import {ProblemDetailsPageComponent} from "./problem-details-page.component";
import {IdeaModule} from "../../../core/idea/idea.module";
import {SolutionModule} from "../../../core/solution/solution.module";
@NgModule({
  imports: [SharedModule.forRoot(), ProblemModule, IdeaModule, SolutionModule, ProblemDetailsPageRoutingModule],
  declarations: [ProblemDetailsPageComponent],
  exports: []
})
export class ProblemDetailsPageModule {

}
