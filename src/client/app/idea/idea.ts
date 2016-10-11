
import {BaseEntity} from "../base-entity";
/**
 * Created by PC on 10/10/2016.
 */

export class Idea extends BaseEntity {
  public problem: string;
  public solution: string;
  public title: string;
  public owner: any;


  toString(): string {
    return super.toString() + "\nPROBLEM: " + this.problem + "\nSOLUTION: " + this.solution;
  }
}
