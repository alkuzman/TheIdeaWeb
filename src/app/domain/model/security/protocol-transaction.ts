import {ProtocolTransactionMessageNumber} from "../enumerations/protocol-transaction-message-number";
import {ProtocolTransactionMessageOne} from "./messages/protocol-transaction-message-one";
import {ProtocolTransactionStep} from "./protocol-transaction-step";
import {BaseEntityImpl} from "../base-entity-impl";
/**
 * Created by Viki on 2/19/2017.
 */


export class ProtocolTransaction extends BaseEntityImpl{
  public messages: ProtocolTransactionStep[];

  public currentStep: ProtocolTransactionMessageNumber;

  constructor() {
    super();
    this.currentStep = ProtocolTransactionMessageNumber.MONE;
    this.messages = [];
  }
}
