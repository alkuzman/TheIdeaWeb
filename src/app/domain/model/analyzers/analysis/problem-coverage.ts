import {SolutionQualityStatus} from "./solution-quality-status";
import {Keyword} from "../../ideas/keyword";
import {TextQuality} from "./text-quality";
import {BaseEntityImpl} from "../../base-entity-impl";
/**
 * Created by AKuzmanoski on 03/03/2017.
 */
export class ProblemCoverage extends BaseEntityImpl implements TextQuality {
  public status: SolutionQualityStatus;
  public coverage: number;
  public coveredKeywords: Keyword[];
  public notCoveredKeywords: Keyword[];
}
