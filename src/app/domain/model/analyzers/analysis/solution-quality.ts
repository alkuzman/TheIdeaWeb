import {ProblemCoverage} from "./problem-coverage";
import {SnackPeakQuality} from "./snack-peak-quality";
import {BaseEntityImpl} from "../../base-entity-impl";
/**
 * Created by AKuzmanoski on 24/02/2017.
 */
export class SolutionQuality extends BaseEntityImpl {
  public problemCoverage: ProblemCoverage;
  public snackPeakQuality: SnackPeakQuality;
}
