/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {NgModule} from "@angular/core";
import {NewIdeaPageComponent} from "./new-idea-page-component";
import {SharedModule} from "../../../shared/shared.module";
import {SolutionModule} from "../../../core/solution/solution.module";
import {NewIdeaPageRoutingModule} from "./new-idea-page-routing.module";
@NgModule({
  imports: [SharedModule.forRoot(), SolutionModule, NewIdeaPageRoutingModule],
  declarations: [NewIdeaPageComponent],
  exports: [NewIdeaPageComponent]
})
export class NewIdeaPageModule {

}
