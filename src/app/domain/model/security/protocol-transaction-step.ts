import {ProtocolTransactionMessageNumber} from "../enumerations/protocol-transaction-message-number";
import {BaseEntityImpl} from "../base-entity-impl";
/**
 * Created by Viki on 3/1/2017.
 */


export class ProtocolTransactionStep extends BaseEntityImpl{
  public stepNumber: ProtocolTransactionMessageNumber;
  public stepMessage: string;
}
