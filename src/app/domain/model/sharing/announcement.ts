import {BaseEntityImpl} from "../base-entity-impl";
import {Package} from "./package";
import {Searchable} from "./searchable";
/**
 * Created by AKuzmanoski on 23/10/2016.
 */
export class Announcement extends BaseEntityImpl implements Searchable {
  public pckg: Package;
}