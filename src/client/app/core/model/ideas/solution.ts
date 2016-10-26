import {BaseEntityImpl} from "../base-entity-impl";
import {Idea} from "./idea";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */
export class Solution extends BaseEntityImpl {
  public text: string;
  public idea: Idea;

  toString(): string {
    return super.toString() + "\n" +
      "idea: " + this.idea + "\n" +
      "text: " + this.text + "\n";
  }
}
