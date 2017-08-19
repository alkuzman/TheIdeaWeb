import {BaseEntityImpl} from "../base-entity-impl";
import {Problem} from "./problem";
import {User} from "../authentication/user";
import {Award} from "../awards/award";
import {Badge} from "../awards/badges/badge";
import {DigitalGoods} from "./digital_goods";
/**
 * Created by PC on 10/10/2016.
 */

export class Idea extends BaseEntityImpl implements DigitalGoods {
  public problem: Problem;
  public snackPeak: string;
  public title: string;
  public owner: User;
  public keywords: string[];
  public awards: Award<Badge<any, any>>[];


  toString(): string {
    return super.toString() + "\n" +
      "title: " + this.title + "\n" +
      "problem: " + this.problem.toString();
  }
}
