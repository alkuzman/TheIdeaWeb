import {Agent} from "./agent";
import {Role} from "../enumerations/role";
import {Provider} from "../enumerations/provider";
import {Person} from "./person";
/**
 * Created by AKuzmanoski on 23/10/2016.
 */
export class User extends Agent implements Person {
  firstName: string;
  lastName: string;
  country: string;
  public password: string;
  public role: Role;
  public provider: Provider;

  constructor() {
    super();
  }

  public get fullName(): string {
    return this.firstName + " " + this.lastName;
  }

  toString(): string {
    return "Email: " + this.email + "\n" +
      "FirstName: " + this.firstName + "\n" + "LastName: " + this.lastName + "\n" + super.toString();
  }


  getUser(): User {
    return this;
  }
}
