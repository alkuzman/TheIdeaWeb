import {Agent} from "../authentication/agent";
import {BaseRelationship} from "../base-relationship";
/**
 * Created by Viki on 1/25/2017.
 */
export class Recipient extends BaseRelationship {
  public agent: Agent;
  public seen: Date;
}
