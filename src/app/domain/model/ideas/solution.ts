import {BaseEntityImpl} from "../base-entity-impl";
import {Idea} from "./idea";
import {DigitalGood} from "./digital_good";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */
export class Solution extends BaseEntityImpl implements DigitalGood {
  public text: string;
  public idea: Idea;

  toString(): string {
    return super.toString() + "\n" +
      "idea-details: " + this.idea + "\n" +
      "text: " + this.text + "\n";
  }

  getText(): string {
    return this.text;
  }

}
