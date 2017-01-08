import {Properties} from "../../../../../shared/utils/properties";
/**
 * Created by AKuzmanoski on 06/01/2017.
 */
export interface RegisterFormErrors extends Properties {
  firstName?: string;
  lastName?: string;
  "passwords.password"?: string;
  "passwords.confirmPassword"?: string;
  passwords?: string;
}
