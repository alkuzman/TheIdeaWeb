import {ProtocolSession} from "./protocol-session";
import {Agent} from "../authentication/agent";
/**
 * Created by Viki on 3/9/2017.
 */


export class ProtocolParticipantSessionData {
    public participant: Agent;
    public sessionKeyEncrypted: string;
}