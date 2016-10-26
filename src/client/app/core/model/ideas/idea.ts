import {BaseEntityImpl} from "../base-entity-impl";
import {Problem} from "./problem";
import {User} from "../authentication/user";
/**
 * Created by PC on 10/10/2016.
 */

export class Idea extends BaseEntityImpl {
  public problem: Problem;
  public snackPeak: string;
  public title: string;
  public owner: User;


  toString(): string {
    return super.toString() + "\n" +
      "title: " + this.title + "\n" +
      "problem: " + this.problem.toString();
  }
}
