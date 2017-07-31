import {BaseEntity} from "../base-entity";
/**
 * Created by AKuzmanoski on 23/10/2016.
 */
export interface Shareable extends BaseEntity {
  toString(): string;
}
