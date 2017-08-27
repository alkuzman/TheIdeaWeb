import {BaseEntityImpl} from "../base-entity-impl";
import {Idea} from "./idea";
import {DigitalGoods} from "./digital_goods";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */
export class Solution extends BaseEntityImpl {
  public text: string;
  public idea: Idea;

  toString(): string {
    return super.toString() + "\n" +
      "idea-details: " + this.idea + "\n" +
      "text: " + this.text + "\n";
  }

}
