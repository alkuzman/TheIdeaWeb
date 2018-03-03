import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {SolutionModule} from "../../../domain/solution/solution.module";
import {ProblemModule} from "../../../domain/problem/problem.module"
import {NewIdeaPageRoutingModule} from "../new-idea-page/new-idea-page-routing.module";
import {UpdateIdeaPageComponent} from "./update-idea-page-component";
import {UpdateIdeaPageRoutingModule} from "./update-idea-page-routing.module";

/**
 * Created by VikiPeeva on 01/07/2018.
 */

@NgModule({
  imports: [SharedModule.forRoot(), SolutionModule, ProblemModule, UpdateIdeaPageRoutingModule],
  declarations: [UpdateIdeaPageComponent],
  exports: [UpdateIdeaPageComponent]
})
export class UpdateIdeaPageModule {
}
