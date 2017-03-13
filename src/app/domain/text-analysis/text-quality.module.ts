/**
 * Created by AKuzmanoski on 13/03/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {ProblemCoverageDetailsComponent} from "./components/problem-coverage/problem-coverage-details/problem-coverage-details.component";
import {ProblemCoverageValueComponent} from "./components/problem-coverage/problem-coverage-value/problem-coverage-value.component";
import {ProblemCoverageKeywordsComponent} from "./components/problem-coverage/problem-coverage-keywords/problem-coverage-keywords.component";
@NgModule({
  imports: [SharedModule],
  declarations: [ProblemCoverageKeywordsComponent, ProblemCoverageValueComponent, ProblemCoverageDetailsComponent],
  exports: [ProblemCoverageKeywordsComponent, ProblemCoverageValueComponent, ProblemCoverageDetailsComponent]
})
export class TextQualityModule {

}
