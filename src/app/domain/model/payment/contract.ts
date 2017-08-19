import {BaseEntityImpl} from "../base-entity-impl";
import {Payment} from "./payment";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */

export class Contract extends BaseEntityImpl implements Payment{

    public text: string;

    getText(): string {
        return this.text;
    }
}
