import {Properties} from "../../shared/utils/properties";
/**
 * Created by Viki on 1/26/2017.
 */
export interface StandardFilterProperties extends Properties {
  query?: string;
  limit?: string;
  offset?: string;
}
