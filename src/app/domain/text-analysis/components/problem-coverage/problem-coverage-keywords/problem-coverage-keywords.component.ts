/**
 * Created by AKuzmanoski on 13/03/2017.
 */
import {Component, Input} from "@angular/core";
import {Keyword} from "../../../../model/ideas/keyword";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-coverage-keywords",
  templateUrl: "problem-coverage-keywords.component.html"
})
export class ProblemCoverageKeywordsComponent {
  @Input("coveredKeywords") coveredKeywords: Keyword[];
  @Input("notCoveredKeywords") notCoveredKeywords: Keyword[];
}
