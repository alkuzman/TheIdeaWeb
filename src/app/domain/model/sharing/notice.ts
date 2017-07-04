import {BaseEntity} from "../base-entity";
import {Agent} from "../authentication/agent";
/**
 * Created by Viki on 3/9/2017.
 */


export interface Notice extends BaseEntity{

    recipient: Agent;
    seen: Date;
    opened: Date;
}