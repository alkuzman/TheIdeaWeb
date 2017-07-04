import {BaseEntityImpl} from "../base-entity-impl";
import {Notice} from "./notice";
import {Agent} from "../authentication/agent";
/**
 * Created by AKuzmanoski on 23/10/2016.
 */
export abstract class AbstractNotice extends BaseEntityImpl implements Notice{
    public recipient: Agent;
    public seen: Date;
    public opened: Date;

    constructor() {
        super();
    }

}
