import {BaseEntityImpl} from '../base-entity-impl';
import {Idea} from './idea';
import {EntityWithText} from './entity-with-text';

/**
 * Created by AKuzmanoski on 17/10/2016.
 */
export class Solution extends BaseEntityImpl implements EntityWithText {
  public text: string;
  public idea: Idea;

  toString(): string {
    return super.toString() + '\n' +
      'idea-details: ' + this.idea + '\n' +
      'text: ' + this.text + '\n';
  }

}
