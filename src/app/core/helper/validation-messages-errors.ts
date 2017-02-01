/**
 * Created by AKuzmanoski on 06/01/2017.
 */
export interface ValidationMessagesErrors {
  [key: string]: string;
  required?: string;
  minlength?: string;
  maxlength?: string;
  pattern?: string;
  passwordMatcher?: string;
  email?: string;
}
