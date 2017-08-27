

import {DigitalGoods} from "./digital_goods";
import {User} from "../authentication/user";
import {BaseEntityImpl} from "../base-entity-impl";

export abstract class AbstractDigitalGoods extends BaseEntityImpl implements DigitalGoods {
    public owner: User;

    public abstract getText(): string;
}