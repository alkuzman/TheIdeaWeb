import {BaseEntityImpl} from "../base-entity-impl";
import {ProtocolParticipantOneSessionData} from "./protocol-participant-one-session-data";
import {ProtocolTransactionStepNotice} from "./notices/protocol-transaction-step-notice";
import {ProtocolTransactionStepOneNotice} from "./notices/protocol-transaction-step-one-notice";
import {Idea} from "../ideas/idea";
import {ProtocolParticipantTwoSessionData} from "./protocol-participant-two-session-data";
/**
 * Created by Viki on 3/9/2017.
 */


export class ProtocolSession extends BaseEntityImpl {

    public participantOneSessionData: ProtocolParticipantOneSessionData;
    public participantTwoSessionData: ProtocolParticipantTwoSessionData;
    public idea: Idea;

    constructor() {
        super();
    }
}