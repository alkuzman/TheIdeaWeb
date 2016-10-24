/**
 * Created by AKuzmanoski on 17/10/2016.
 */

import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {HttpModule, JsonpModule} from "@angular/http";
import {ProblemFormComponent} from "./component/problem-form/problem-form.component";
import {ProblemService} from "./problem.service";

@NgModule({
  imports: [SharedModule.forRoot(), HttpModule, JsonpModule],
  declarations: [ProblemFormComponent],
  providers: [ProblemService],
  exports: [ProblemFormComponent],
})
export class ProblemModule {

}
