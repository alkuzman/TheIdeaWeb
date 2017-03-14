import {AbstractProtocolTransactionStepNotice} from "./abstract-protocol-transaction-step-notice";
import {ProtocolTransactionStepTwoNotice} from "./protocol-transaction-step-two-notice";
import {ProtocolTransactionStepNotice} from "./protocol-transaction-step-notice";
/**
 * Created by Viki on 3/9/2017.
 */


export class ProtocolTransactionStepOneNotice extends AbstractProtocolTransactionStepNotice<ProtocolTransactionStepTwoNotice> {}