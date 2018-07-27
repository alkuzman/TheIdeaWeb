import {BaseEntity} from '../base-entity';
import {User} from '../authentication/user';
import {TitledEntity} from './titled-entity';

export interface DigitalGoods extends BaseEntity, TitledEntity {
  owner: User;

  getText(): string;
}
