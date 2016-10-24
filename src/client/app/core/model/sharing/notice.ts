import {BaseEntityImpl} from "../base-entity-impl";
import {Agent} from "../authentication/agent";
/**
 * Created by AKuzmanoski on 23/10/2016.
 */
export abstract class Notice extends BaseEntityImpl {
  private recipient: Agent;
  private seen: boolean;
}
