import {ValidationMessagesErrors} from "../../../../core/helper/validation-messages-errors";

export interface OrganizationValidationMessages {
  [key: string]: ValidationMessagesErrors;
  name?: ValidationMessagesErrors;
  email?: ValidationMessagesErrors;
  description?: ValidationMessagesErrors;
}
