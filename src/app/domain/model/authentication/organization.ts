import {Agent} from "./agent";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */

export class Organization extends Agent {

  public description: string;

  public get fullName(): string {
    return this.name;
  }
}
