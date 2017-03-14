import {Injectable} from "@angular/core";
import {ProblemCoverage} from "../model/analyzers/analysis/problem-coverage";
import {KeywordSelectionWrapper} from "./keyword-selection-wrapper";
import {Keyword} from "../model/ideas/keyword";
/**
 * Created by AKuzmanoski on 14/03/2017.
 */
@Injectable()
export class KeywordSelectionService {
  public getKeywordSelections(problemCoverage: ProblemCoverage): KeywordSelectionWrapper[] {
    let keywords: KeywordSelectionWrapper[] = [];
    let sizeI = problemCoverage.coveredKeywords.length;
    let sizeJ = problemCoverage.notCoveredKeywords.length;
    let i: number = 0;
    let j: number = 0;

    while (true) {
      if (i < sizeI) {
        if (j < sizeJ) {
          if (problemCoverage.coveredKeywords[i].score > problemCoverage.notCoveredKeywords[j].score) {
            keywords.push(new KeywordSelectionWrapper(problemCoverage.coveredKeywords[i], true));
            i++;
          } else {
            keywords.push(new KeywordSelectionWrapper(problemCoverage.notCoveredKeywords[j], false));
            j++;
          }
        } else {
          keywords.push(new KeywordSelectionWrapper(problemCoverage.coveredKeywords[i], true));
          i++;
        }
      } else if (j < sizeJ) {
        keywords.push(new KeywordSelectionWrapper(problemCoverage.notCoveredKeywords[j], false));
        j++;
      } else {
        break;
      }
    }

    return keywords;
  }
}
