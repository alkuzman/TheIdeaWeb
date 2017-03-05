import {PipeTransform, Pipe} from "@angular/core";
import {ProtocolTransactionMessageNumber} from "../../model/enumerations/protocol-transaction-message-number";
import {convertValueToOutputAst} from "@angular/compiler/src/output/value_util";
/**
 * Created by Viki on 3/3/2017.
 */


@Pipe({
  name: "buyingTransactionNoticeMessageNumber"
})
export class BuyingTransactionNoticeMessageNumberPipe implements PipeTransform {
  transform(value: ProtocolTransactionMessageNumber, args: any[]): any {
    return value == null || this.valueIsProtocolTransactionMessageNumber(value) ?
      this.messages[value] : "";
  }

  private messages = {
    'MONE': 'You have been sent buying request',
    'MTWO': 'The owner has responded on your buying request',
    'MTHREE': 'The buyer accepted your offer',
    'MFOUR': 'The owner sent you the encrypted idea',
    'MFIVE': 'The buyer commits to the procedure',
    'MSIX': '',
    'MSEVEN': '',
    'MEIGHT': 'You have received the result from the transaction',
  };

  private valueIsProtocolTransactionMessageNumber(value: ProtocolTransactionMessageNumber) {
    for (let messageNumber in ProtocolTransactionMessageNumber) {
      if (ProtocolTransactionMessageNumber[value] == messageNumber) {
        return true;
      }
    }
    return false;
  }
}
