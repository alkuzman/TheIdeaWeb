/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {SolutionFieldsComponent} from "./components/solution-forms/solution-fields/solution-fields.component";
import {IdeaModule} from "../idea/idea.module";
import {SolutionFormComponent} from "./components/solution-forms/solution-form/solution-form.component";
import {NewSolutionFormComponent} from "./components/solution-forms/solution-form-new/solution-form-new.component";
import {SecurityModule} from "../security/security.module";
import {SolutionQualityComponent} from "./components/solution-quality/solution-quality.component";
import {SolutionQualityDialog} from "./components/solution-quality/solution-quality-dialog/solution-quality-dialog.component";
import {SolutionQualityDetailsComponent} from "./components/solution-quality/solution-quality-details/solution-quality-details.component";
import {AwardModule} from "../award/award.module";
@NgModule({
  imports: [SharedModule, IdeaModule, AwardModule, SecurityModule],
  declarations: [SolutionQualityDetailsComponent, SolutionQualityDialog, SolutionQualityComponent, SolutionFieldsComponent, SolutionFormComponent,
    NewSolutionFormComponent],
  exports: [SolutionQualityDetailsComponent, SolutionQualityDialog, SolutionQualityComponent, SolutionFieldsComponent, SolutionFormComponent,
    NewSolutionFormComponent],
  entryComponents: [SolutionQualityDialog]
})
export class SolutionModule {

}
