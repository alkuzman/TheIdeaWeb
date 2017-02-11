import {BaseEntity} from "../base-entity";
/**
 * Created by AKuzmanoski on 23/10/2016.
 */
export interface Sharable extends BaseEntity {
  toString(): string;
}
