import {ProtocolSession} from "./protocol-session";
import {Agent} from "../authentication/agent";
import {BaseRelationship} from "../base-relationship";
/**
 * Created by Viki on 3/9/2017.
 */


export class ProtocolParticipantOneSessionData extends BaseRelationship {
    public participant: Agent;
    public sessionKeyEncrypted: string;
}