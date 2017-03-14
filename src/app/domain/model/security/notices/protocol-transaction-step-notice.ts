import {Agent} from "../../authentication/agent";
import {Idea} from "../../ideas/idea";
import {Notice} from "../../sharing/notice";
import {ProtocolSession} from "../protocol-session";
/**
 * Created by Viki on 3/9/2017.
 */


export interface ProtocolTransactionStepNotice<T extends ProtocolTransactionStepNotice<T>> extends Notice {

    message: string;
    originator: Agent;
    previousStepNotice: ProtocolTransactionStepNotice<any>;
    protocolSession: ProtocolSession;
    activated: boolean;

}