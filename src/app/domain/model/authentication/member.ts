import {BaseEntityImpl} from "../base-entity-impl";
import {Person} from "./person";
import {Organization} from "./organization";
import {MemberRole} from "../enumerations/member-role";
import {User} from "./user";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */
export class Member extends BaseEntityImpl implements Person {
  getUser(): User {
    return this.user;
  }

  public organization: Organization;
  public user: User;
  public role: MemberRole;

  get lastName(): string {
    return this.user.lastName;
  }

  set lastName(value: string) {
    this.user.lastName = value;
  }

  get firstName(): string {
    return this.user.firstName;
  }

  set firstName(value: string) {
    this.user.firstName = value;
  }
}
