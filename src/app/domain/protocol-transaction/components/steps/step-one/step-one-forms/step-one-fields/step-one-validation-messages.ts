import {ValidationMessagesErrors} from "../../../../../../../core/helper/validation-messages-errors";
/**
 * Created by Viki on 2/20/2017.
 */


export interface StepOneValidationMessages {
  [key: string]: ValidationMessagesErrors;
  bidPrice?: ValidationMessagesErrors;
  bidCurrency?: ValidationMessagesErrors;
}
