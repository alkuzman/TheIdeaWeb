import {BaseEntityImpl} from "../base-entity-impl";
import {Currency} from "./currency";
/**
 * Created by Viki on 2/21/2017.
 */


export class Price extends BaseEntityImpl {
  public value: number;
  public currency: Currency;

  constructor() {
    super();
    this.currency = new Currency();
  }

  toString(): string {
    let str: string = this.value + " " + this.currency.value;
    console.log(str);
    return str;
  }
}
