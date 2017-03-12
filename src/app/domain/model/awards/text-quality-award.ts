import {TextQualityBadge} from "./badges/text-quality-badge";
import {TextQuality} from "../analyzers/analysis/text-quality";
import {StandardAward} from "./standard-award";
/**
 * Created by AKuzmanoski on 07/03/2017.
 */
export class TextQualityAward<T extends TextQualityBadge<any, T>, F extends TextQuality> extends StandardAward<T> {
  public textQuality: F;
}
