/**
 * Created by AKuzmanoski on 14/11/2016.
 */
import {NgModule} from "@angular/core";
import {ProblemModule} from "../../../core/problem/problem.module";
import {SharedModule} from "../../../shared/shared.module";
import {ProblemDetailsPageRoutingModule} from "./problem-details-page-routing.module";
import {ProblemDetailsPageComponent} from "./problem-details-page.component";
import {IdeaModule} from "../../../core/idea/idea.module";
@NgModule({
  imports: [SharedModule.forRoot(), ProblemModule, IdeaModule, ProblemDetailsPageRoutingModule],
  declarations: [ProblemDetailsPageComponent],
  exports: []
})
export class ProblemDetailsPageModule {

}
