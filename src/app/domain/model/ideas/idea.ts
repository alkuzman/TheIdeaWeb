import {Problem} from './problem';
import {Award} from '../awards/award';
import {Badge} from '../awards/badges/badge';
import {AbstractDigitalGoods} from './abstract_digital_goods';
import {Shareable} from '../sharing/shareable';

/**
 * Created by PC on 10/10/2016.
 */

export class Idea extends AbstractDigitalGoods implements Shareable {
  public problem: Problem;
  public snackPeak: string;
  public keywords: string[];
  public awards: Award<Badge<any, any>>[];

  getText(): string {
    return '';
  }

  toString(): string {
    return super.toString() + '\n' +
      'title: ' + this.title + '\n' +
      'problem: ' + this.problem.toString();
  }
}
