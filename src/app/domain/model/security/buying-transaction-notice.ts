import {Notice} from "../sharing/notice";
import {ProtocolTransaction} from "./protocol-transaction";
import {BuyingTransaction} from "./buying-transaction";
import {Agent} from "../authentication/agent";
/**
 * Created by Viki on 3/1/2017.
 */


export class BuyingTransactionNotice extends Notice {
  public buyingTransaction: BuyingTransaction;

  public originator: Agent;
}
