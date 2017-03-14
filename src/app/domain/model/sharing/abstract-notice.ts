import {BaseEntityImpl} from "../base-entity-impl";
import {Recipient} from "./recipient";
import {Notice} from "./notice";
/**
 * Created by AKuzmanoski on 23/10/2016.
 */
export abstract class AbstractNotice extends BaseEntityImpl implements Notice{
    public recipients: Recipient[];

    constructor() {
        super();
        this.recipients = [];
    }

    getRecipients(): Recipient[] {
        return this.recipients;
    }

    setRecipients(recipients: Recipient[]): void {
        this.recipients = recipients;
    }
}
