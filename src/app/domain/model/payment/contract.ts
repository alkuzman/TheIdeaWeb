import {BaseEntityImpl} from "../base-entity-impl";
import {Payment} from "./payment";
/**
 * Created by AKuzmanoski on 17/10/2016.
 */

export class Contract extends BaseEntityImpl implements Payment{

    public text: string;
    public title: string;

    getText(): string {
        const obj = {
            title: this.title,
            text: this.text
        };
        return JSON.stringify(obj);
    }

    constructObject(text: string): void {
        const obj: {title: string, text: string} = JSON.parse(text);
        this.text = obj.text;
        this.title = obj.title;
    }
}
