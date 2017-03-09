import {ProtocolTransactionMessageNumber} from "../enumerations/protocol-transaction-message-number";
import {BaseEntityImpl} from "../base-entity-impl";
import {Agent} from "../authentication/agent";
/**
 * Created by Viki on 3/1/2017.
 */


export class ProtocolTransactionStep extends BaseEntityImpl{
  public stepNumber: ProtocolTransactionMessageNumber;
  public stepMessage: string;
  public creator: Agent;
}
