/**
 * Created by AKuzmanoski on 17/10/2016.
 */

import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {HttpModule, JsonpModule} from "@angular/http";
import {ProblemFormComponent} from "./component/problem-form/problem-form.component";
import {ProblemService} from "./problem.service";
import {TextEditorModule} from "../text-editor/text-editor.module";
import {NewProblemFormComponent} from "./component/new-problem/new-problem-form.component";
import {ProblemListComponent} from "./component/problem-list/problem-list.component";
import {ProblemCardComponent} from "./component/problem-card/problem-card.component";
import {ProblemFieldsComponent} from "./component/problem-fields/problem-fields.component";
import {ProblemValueAccessorDirective} from "./directives/problem-value-accessor.directive";

@NgModule({
  imports: [SharedModule.forRoot(), HttpModule, JsonpModule, TextEditorModule],
  declarations: [ProblemFieldsComponent, ProblemValueAccessorDirective, ProblemFormComponent, NewProblemFormComponent, ProblemListComponent, ProblemCardComponent],
  providers: [ProblemService],
  exports: [ProblemFieldsComponent, ProblemValueAccessorDirective, ProblemFormComponent, NewProblemFormComponent, ProblemListComponent, ProblemCardComponent],
})
export class ProblemModule {

}
