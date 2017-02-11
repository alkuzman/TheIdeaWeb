import {ValidationMessagesErrors} from "../../../../../core/helper/validation-messages-errors";
/**
 * Created by AKuzmanoski on 06/01/2017.
 */
export interface ValidationMessages {
  [key: string]: ValidationMessagesErrors;
  firstName?: ValidationMessagesErrors;
  lastName?: ValidationMessagesErrors;
  "passwords.password"?: ValidationMessagesErrors;
  "passwords.confirmPassword"?: ValidationMessagesErrors;
  passwords?: ValidationMessagesErrors;
  country?: ValidationMessagesErrors;
}
