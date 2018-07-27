import {BaseEntityImpl} from '../base-entity-impl';
import {Person} from '../authentication';
import {TitledEntity} from './titled-entity';
import {EntityWithText} from './entity-with-text';
import {Shareable} from '../sharing/shareable';

/**
 * Created by AKuzmanoski on 17/10/2016.
 */
export class Problem extends BaseEntityImpl implements TitledEntity, EntityWithText, Shareable {
  public title: string;
  public text: string;
  public questioner: Person;
  public keywords: string[];

  toString(): string {
    return super.toString() + '\n' +
      'title: ' + this.title + '\n' +
      'text: ' + this.text + '\n';
  }

}
