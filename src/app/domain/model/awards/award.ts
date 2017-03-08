import {Badge} from "./badges/badge";
import {BaseEntity} from "../base-entity";
/**
 * Created by AKuzmanoski on 26/02/2017.
 */
export interface Award<T extends Badge<any, T>> extends BaseEntity {
  badge: T;
  description: string;
}
