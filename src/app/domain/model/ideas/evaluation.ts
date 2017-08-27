

import {BaseEntityImpl} from "../base-entity-impl";
import {DigitalGoods} from "./digital_goods";
import {AbstractDigitalGoods} from "./abstract_digital_goods";

export class Evaluation extends AbstractDigitalGoods implements DigitalGoods {

    getText(): string {
        return "";
    }
}