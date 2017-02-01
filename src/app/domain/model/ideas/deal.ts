import {BaseEntityImpl} from "../base-entity-impl";
import {Person} from "../authentication/person";
import {Idea} from "./idea";
import {Contract} from "./contract";
/**
 * Created by AKuzmanoski on 23/10/2016.
 */
export class Deal extends BaseEntityImpl {
  public idea: Idea;
  public buyer: Person;
  public contract: Contract;
}
