import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
/**
 * Created by AKuzmanoski on 07/01/2017.
 */
export interface UserEmailFormValidationMessages {
  [key: string]: ValidationMessagesErrors;
  email?: ValidationMessagesErrors;
}
