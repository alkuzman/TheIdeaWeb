import {BaseEntity} from "../../base-entity";
/**
 * Created by AKuzmanoski on 07/03/2017.
 */
export interface Badge<F, T extends Badge<F,T>> extends BaseEntity {
  next: T;
  name: string;
  description: string;

  fits(data: F): boolean;
}
