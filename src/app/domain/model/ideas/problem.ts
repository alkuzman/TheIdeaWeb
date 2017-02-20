import {BaseEntityImpl} from "../base-entity-impl";
import {Person} from "../authentication/person";
import any = jasmine.any;
/**
 * Created by AKuzmanoski on 17/10/2016.
 */
export class Problem extends BaseEntityImpl {
  public title: string;
  public text: string;
  public questioner: Person;
  public keywords: string[];

  toString(): string {
    return super.toString() + "\n" +
      "title: " + this.title + "\n" +
      "text: " + this.text + "\n";
  }

}
