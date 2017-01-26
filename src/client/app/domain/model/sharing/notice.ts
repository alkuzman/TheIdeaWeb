import {BaseEntityImpl} from "../base-entity-impl";
import {Recipient} from "./recipient";
/**
 * Created by AKuzmanoski on 23/10/2016.
 */
export abstract class Notice extends BaseEntityImpl {
  public recipients: Recipient[];
  public seen: boolean;
}
