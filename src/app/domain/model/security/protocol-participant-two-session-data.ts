import {Agent} from "../authentication/agent";
import {BaseRelationship} from "../base-relationship";
/**
 * Created by Viki on 3/21/2017.
 */

export class ProtocolParticipantTwoSessionData extends BaseRelationship {
    public participant: Agent;
    public sessionKeyEncrypted: string;
    public dataEncryptionKeyEncrypted: string;
}