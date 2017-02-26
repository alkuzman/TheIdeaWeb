import {ProtocolTransactionMessageNumber} from "../enumerations/protocol-transaction-message-number";
import {ProtocolTransactionMessageOne} from "./messages/protocol-transaction-message-one";
/**
 * Created by Viki on 2/19/2017.
 */


export class ProtocolTransaction {
  public messagesOne: ProtocolTransactionMessageOne[];
  public messagesTwo: ProtocolTransactionMessageOne[];
  public messagesThree: ProtocolTransactionMessageOne[];
  public messagesFour: ProtocolTransactionMessageOne[];
  public messagesFive: ProtocolTransactionMessageOne[];
  public messagesSix: ProtocolTransactionMessageOne[];

  public currentStep: ProtocolTransactionMessageNumber;

  constructor() {
    this.currentStep = ProtocolTransactionMessageNumber.MONE;
  }
}
