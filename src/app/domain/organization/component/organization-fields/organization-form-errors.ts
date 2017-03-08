import {Properties} from "../../../../shared/utils/properties";

export interface OrganizationFormErrors extends Properties {
  name?: string;
  email?: string;
  description?: string;
}
