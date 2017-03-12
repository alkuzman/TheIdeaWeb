import {AbstractBadge} from "./abstract-badge";
import {TextQualityBadge} from "./text-quality-badge";
/**
 * Created by AKuzmanoski on 07/03/2017.
 */
export class ProblemCoverageBadge extends AbstractBadge<Number, ProblemCoverageBadge> implements TextQualityBadge<Number, ProblemCoverageBadge> {
  public minimumCoverage: number;
  public maximumCoverage: number;

  public fits(data: Number): boolean {
    return data < this.maximumCoverage && data >= this.minimumCoverage;
  }
}
