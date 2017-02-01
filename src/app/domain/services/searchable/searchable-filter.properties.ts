import {Properties} from "../../../shared/utils/properties";
/**
 * Created by AKuzmanoski on 20/01/2017.
 */
export interface SearchableFilterProperties extends Properties {
  query?: string;
  limit?: string;
  offset?: string;
}
