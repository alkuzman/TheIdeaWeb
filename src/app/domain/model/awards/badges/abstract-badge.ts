import {Badge} from "./badge";
import {BaseEntityImpl} from "../../base-entity-impl";
/**
 * Created by AKuzmanoski on 07/03/2017.
 */
export abstract class AbstractBadge<F, T extends Badge<F, T>> extends BaseEntityImpl implements Badge<F, T> {
  public next: T;
  public name: string;
  public description: string;


  public abstract fits(data: F): boolean;
}
