

import {BaseEntity} from "../base-entity";
import {User} from "../authentication/user";

export interface DigitalGoods extends BaseEntity {
    owner: User;

    getText(): string;
}