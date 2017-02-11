import {Properties} from "../../../shared/utils/properties";
/**
 * Created by AKuzmanoski on 30/11/2016.
 */
export interface AgentFilterProperties extends Properties {
  query?: string;
  limit?: string;
  offset?: string;
}
