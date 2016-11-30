import {Agent} from "./agent";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */

export class Organization extends Agent {

  public description: string;


  toString(): string {
    return super.toString() + " Description: " + this.description;
  }
}
