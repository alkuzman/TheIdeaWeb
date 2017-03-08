import {AbstractBadge} from "./abstract-badge";
import {TextQualityBadge} from "./text-quality-badge";
/**
 * Created by AKuzmanoski on 07/03/2017.
 */
export class SnackPeakQualityBadge extends AbstractBadge<Number, SnackPeakQualityBadge> implements TextQualityBadge<Number, SnackPeakQualityBadge> {
  public minimumSnackPeakQuality: number;
  public maximumSnackPeakQuality: number;

  public fits(data: Number): boolean {
    return data < this.maximumSnackPeakQuality && data >= this.minimumSnackPeakQuality;
  }
}

