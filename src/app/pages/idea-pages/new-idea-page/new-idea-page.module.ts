/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {NgModule} from "@angular/core";
import {NewIdeaPageComponent} from "./new-idea-page-component";
import {SharedModule} from "../../../shared/shared.module";
import {SolutionModule} from "../../../domain/solution/solution.module";
import {NewIdeaPageRoutingModule} from "./new-idea-page-routing.module";
import {ProblemModule} from "../../../domain/problem/problem.module";
@NgModule({
  imports: [SharedModule.forRoot(), SolutionModule, ProblemModule, NewIdeaPageRoutingModule],
  declarations: [NewIdeaPageComponent],
  exports: [NewIdeaPageComponent]
})
export class NewIdeaPageModule {
}
