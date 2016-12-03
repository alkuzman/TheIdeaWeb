import {BaseEntityImpl} from "../base-entity-impl";
import {Commentable} from "./commentable";
/**
 * Created by AKuzmanoski on 23/10/2016.
 */
export class Comment extends BaseEntityImpl implements Commentable{
  public commentable: Commentable;
}
