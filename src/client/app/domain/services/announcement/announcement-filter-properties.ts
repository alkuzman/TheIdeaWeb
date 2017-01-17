import {Properties} from "../../../shared/utils/properties";
/**
 * Created by AKuzmanoski on 15/01/2017.
 */
export interface AnnouncementFilterProperties extends Properties{
  sharableId?: string,
  ownerId?: string,
  type?: string;
  limit?: string;
  offset?: string;
}
