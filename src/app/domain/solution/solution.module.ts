/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {SolutionFieldsComponent} from "./components/solution-forms/solution-fields/solution-fields.component";
import {IdeaModule} from "../idea/idea.module";
import {SolutionFormComponent} from "./components/solution-forms/solution-form/solution-form.component";
import {NewSolutionFormComponent} from "./components/solution-forms/solution-form-new/solution-form-new.component";
@NgModule({
  imports: [SharedModule, IdeaModule],
  declarations: [SolutionFieldsComponent, SolutionFormComponent, NewSolutionFormComponent],
  exports: [SolutionFieldsComponent, SolutionFormComponent, NewSolutionFormComponent],
})
export class SolutionModule {

}
