import {Badge} from "./badges/badge";
import {BaseEntityImpl} from "../base-entity-impl";
import {Award} from "./award";
/**
 * Created by AKuzmanoski on 07/03/2017.
 */
export class StandardAward<T extends Badge<any, T>> extends BaseEntityImpl implements Award<T> {
  public badge: T;
  public description: string;
}
