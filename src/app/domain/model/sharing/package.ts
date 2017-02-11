import {BaseEntityImpl} from "../base-entity-impl";
import {Sharable} from "./sharable";
import {Contract} from "../ideas/contract";
import {Commentable} from "../comments/commentable";
/**
 * Created by AKuzmanoski on 23/10/2016.
 */
export class Package extends BaseEntityImpl implements Commentable {
  public sharable: Sharable;
  public contracts: Contract[];
}
