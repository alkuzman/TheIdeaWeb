/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {SolutionFieldsComponent} from "./component/solution-fields/solution-fields.component";
import {SolutionValueAccessorDirective} from "./directives/solution-value-accessor.directive";
import {IdeaModule} from "../idea/idea.module";
import {SolutionFormComponent} from "./component/solution-form/solution-form.component";
import {SolutionService} from "./solution.service";
import {NewSolutionFormComponent} from "./component/new-solution-form/new-solution-form.component";
@NgModule({
  imports: [SharedModule.forRoot(), IdeaModule],
  declarations: [SolutionFieldsComponent, SolutionValueAccessorDirective, SolutionFormComponent, NewSolutionFormComponent],
  exports: [SolutionFieldsComponent, SolutionValueAccessorDirective, SolutionFormComponent, NewSolutionFormComponent],
  providers: [SolutionService]
})
export class SolutionModule {

}
