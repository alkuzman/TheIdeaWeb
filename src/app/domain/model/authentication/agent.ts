import {BaseEntityImpl} from "../base-entity-impl";
import {Searchable} from "../sharing/searchable";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */


export class Agent extends BaseEntityImpl implements Searchable {
  public email: string;
  public telephone: string;
  public profilePicture: string;
  public coverPicture: string;

  public get fullName(): string {
    return "";
  }
}
