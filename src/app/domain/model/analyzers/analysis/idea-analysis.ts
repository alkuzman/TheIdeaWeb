import {DocumentAnalysis} from "./document-analysis";
import {Analysis} from "./analysis";
import {ProblemAnalysis} from "./problem-analysis";
import {SolutionQuality} from "./solution-quality";
/**
 * Created by AKuzmanoski on 18/02/2017.
 */
export interface IdeaAnalysis extends DocumentAnalysis {
  problem: ProblemAnalysis;
  solutionQuality: SolutionQuality;
}
