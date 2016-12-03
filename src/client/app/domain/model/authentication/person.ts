import {BaseEntity} from "../base-entity";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */
export interface Person extends BaseEntity{
  firstName: string;
  lastName: string;
  name: string;
}
