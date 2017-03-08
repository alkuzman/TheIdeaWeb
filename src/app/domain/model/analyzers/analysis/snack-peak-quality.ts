import {BaseEntityImpl} from "../../base-entity-impl";
import {TextQuality} from "./text-quality";
/**
 * Created by AKuzmanoski on 04/03/2017.
 */
export class SnackPeakQuality extends BaseEntityImpl implements TextQuality {
  public status: boolean;
  public quality: number;
}
