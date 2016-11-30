import {BaseEntityImpl} from "../base-entity-impl";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */


export class Agent extends BaseEntityImpl {
  public email: string;
  public telephone: string;
  public profilePicture: string;
  public coverPicture: string;


  toString(): string {
    return "Email " + this.email + super.toString();
  }
}
