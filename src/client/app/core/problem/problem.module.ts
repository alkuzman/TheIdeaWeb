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

@NgModule({
  imports: [SharedModule.forRoot(), HttpModule, JsonpModule, TextEditorModule],
  declarations: [ProblemFormComponent, NewProblemFormComponent, ProblemListComponent, ProblemCardComponent],
  providers: [ProblemService],
  exports: [NewProblemFormComponent, ProblemListComponent],
})
export class ProblemModule {

}
