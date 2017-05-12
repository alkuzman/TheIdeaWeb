
import {ValidationMessagesErrors} from "../../../../../../core/helper/validation-messages-errors";
/**
 * Created by Viki on 2/20/2017.
 */


export interface PriceRequestPhaseValidationMessages {
  [key: string]: ValidationMessagesErrors;
  price?: ValidationMessagesErrors;
  currency?: ValidationMessagesErrors;
}
