import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
/**
 * Created by AKuzmanoski on 06/01/2017.
 */
export interface SecurityValidationMessages {
  [key: string]: ValidationMessagesErrors;
  password?: ValidationMessagesErrors
}