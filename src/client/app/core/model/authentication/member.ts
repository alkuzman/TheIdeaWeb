import {BaseEntityImpl} from "../base-entity-impl";
import {Person} from "./person";
import {Organization} from "./organization";
import {MemberRole} from "../enumerations/member-role";
import {User} from "./user";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */
export class Member extends BaseEntityImpl implements Person {
  public organization: Organization;
  public user: User;
  public role: MemberRole;

  get firstName(): string {
    return this.user.firstName;
  }

  get lastName(): string {
    return this.user.lastName;
  }

  set firstName(firstName:string) {
    this.user.firstName = firstName;
  }

  set lastName(lastName:string) {
    this.user.lastName = lastName;
  }
}
