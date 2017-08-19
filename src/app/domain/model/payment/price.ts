import {BaseEntityImpl} from "../base-entity-impl";
import {Currency} from "../helpers/currency";
import {Payment} from "./payment";

/**
 * Created by Viki on 2/21/2017.
 */


export class Price extends BaseEntityImpl implements Payment {
    public value: number;
    public currency: Currency;

    constructor() {
        super();
        this.currency = new Currency();
    }

    getText(): string {
        return this.toString();
    }

    toString(): string {
        let str: string = this.value + " " + this.currency.value;
        return str;
    }
}
