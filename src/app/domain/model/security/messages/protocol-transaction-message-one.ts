import {ProtocolTransactionMessage} from "./protocol-transaction-message";
import {Price} from "../../helpers/price";
/**
 * Created by Viki on 2/20/2017.
 */


export class ProtocolTransactionMessageOne extends ProtocolTransactionMessage {
  public biddingPrice: Price;

  constructor() {
    super();
    this.biddingPrice = new Price();
  }
}
