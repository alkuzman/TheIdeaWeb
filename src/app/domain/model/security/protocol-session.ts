import {BaseEntityImpl} from "../base-entity-impl";
import {ProtocolParticipantSessionData} from "./protocol-participant-session-data";
import {ProtocolTransactionStepNotice} from "./notices/protocol-transaction-step-notice";
import {ProtocolTransactionStepOneNotice} from "./notices/protocol-transaction-step-one-notice";
import {Idea} from "../ideas/idea";
/**
 * Created by Viki on 3/9/2017.
 */


export class ProtocolSession extends BaseEntityImpl {

    public participantsSessionData: ProtocolParticipantSessionData[];
    public idea: Idea;

    constructor() {
        super();
        this.participantsSessionData = [];
    }
}