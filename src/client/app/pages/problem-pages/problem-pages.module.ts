import {NgModule} from "@angular/core";
import {ProblemPagesComponent} from "./problem-pages.component";
import {NewProblemPageModule} from "./new-problem-page/new-problem-page.module";
import {SharedModule} from "../../shared/shared.module";
import {ProblemsPageModule} from "./problems-page/problems-page.module";
import {ProblemPagesRoutingModule} from "./problem-pages-routing.module";
/**
 * Created by AKuzmanoski on 24/10/2016.
 */
@NgModule({
  imports: [SharedModule.forRoot(), ProblemsPageModule, NewProblemPageModule, ProblemPagesRoutingModule],
  declarations: [ProblemPagesComponent],
  exports: [ProblemPagesComponent],
  providers: []
})
export class ProblemPagesModule {

}
