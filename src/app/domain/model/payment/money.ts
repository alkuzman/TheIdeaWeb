import {BaseEntityImpl} from "../base-entity-impl";
import {Currency} from "../helpers/currency";
import {Payment} from "./payment";

/**
 * Created by Viki on 2/21/2017.
 */


export class Money extends BaseEntityImpl implements Payment {
    public value: number;
    public currency: Currency;

    constructor() {
        super();
        this.currency = new Currency();
    }

    getText(): string {
        return this.toString();
    }

    constructObject(text: string): void {
        const fields = text.split(' ');
        this.value = parseFloat(fields[0]);
        this.currency.value = fields[1];
    }

    toString(): string {
        let str: string = this.value + " " + this.currency.value;
        return str;
    }
}