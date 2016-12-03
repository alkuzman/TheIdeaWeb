/**
 * Created by AKuzmanoski on 17/10/2016.
 */

import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {HttpModule, JsonpModule} from "@angular/http";
import {ProblemFormComponent} from "./components/problem-forms/problem-form/problem-form.component";
import {ProblemService} from "./problem.service";
import {NewProblemFormComponent} from "./components/problem-forms/problem-form-new/problem-form-new.component";
import {ProblemListComponent} from "./components/problem-list/problem-list.component";
import {ProblemCardComponent} from "./components/problem-card/problem-card.component";
import {ProblemFieldsComponent} from "./components/problem-forms/problem-fields/problem-fields.component";
import {ProblemDetailsComponent} from "./components/problem-details/problem-details/problem-details.component";
import {LoadProblemDetailsComponent} from "./components/problem-details/load-problem-details/load-problem-details.component";

@NgModule({
  imports: [SharedModule],
  declarations: [ProblemFieldsComponent, ProblemFormComponent, NewProblemFormComponent, ProblemListComponent, ProblemCardComponent, ProblemDetailsComponent, LoadProblemDetailsComponent],
  providers: [ProblemService],
  exports: [ProblemFieldsComponent, ProblemFormComponent, NewProblemFormComponent, ProblemListComponent, ProblemCardComponent, ProblemDetailsComponent, LoadProblemDetailsComponent],
})
export class ProblemModule {

}
