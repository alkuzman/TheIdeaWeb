/**
 * Created by AKuzmanoski on 13/03/2017.
 */
import {Component, Input} from "@angular/core";
import {Keyword} from "../../../../model/ideas/keyword";
import {ProblemCoverage} from "../../../../model/analyzers/analysis/problem-coverage";
import {KeywordSelectionService} from "../../../keyword-selection.service";
import {KeywordSelectionWrapper} from "../../../keyword-selection-wrapper";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-coverage-keywords",
  templateUrl: "problem-coverage-keywords.component.html"
})
export class ProblemCoverageKeywordsComponent {
  _problemCoverage: ProblemCoverage;
  keywordSelections: KeywordSelectionWrapper[];

  @Input("problemCoverage")
  get problemCoverage(): ProblemCoverage {
    return this._problemCoverage;
  }

  set problemCoverage(value: ProblemCoverage) {
    this._problemCoverage = value;
    this.keywordSelections = this.keywordSelectionService.getKeywordSelections(value);
  }

  constructor(private keywordSelectionService: KeywordSelectionService) {

  }
}
