import {BaseEntity} from "../base-entity";
import {User} from "./user";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */
export interface Person extends BaseEntity {
  getUser(): User;
  firstName: string;
  lastName: string;
}
