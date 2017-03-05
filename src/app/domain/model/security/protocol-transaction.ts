import {ProtocolTransactionMessageNumber} from "../enumerations/protocol-transaction-message-number";
import {ProtocolTransactionMessageOne} from "./messages/protocol-transaction-message-one";
import {ProtocolTransactionStep} from "./protocol-transaction-step";
import {BaseEntityImpl} from "../base-entity-impl";
import {Agent} from "../authentication/agent";
/**
 * Created by Viki on 2/19/2017.
 */


export class ProtocolTransaction extends BaseEntityImpl{
  public messages: ProtocolTransactionStep[];

  public currentStep: ProtocolTransactionMessageNumber;

  public members: Agent[];

  constructor() {
    super();
    this.currentStep = ProtocolTransactionMessageNumber.MONE;
    this.messages = [];
    this.members = [];
  }
}
