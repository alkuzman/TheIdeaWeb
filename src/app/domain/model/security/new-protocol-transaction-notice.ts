import {Notice} from "../sharing/notice";
import {ProtocolTransaction} from "./protocol-transaction";
/**
 * Created by Viki on 3/1/2017.
 */


export class NewProtocolTransactionNotice extends Notice {
  public protocolTransaction: ProtocolTransaction;
}
