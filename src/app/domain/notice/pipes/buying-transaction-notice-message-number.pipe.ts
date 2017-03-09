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
    'MTWO': 'You have been sent buying request',
    'MTHREE': 'The owner has responded on your buying request',
    'MFOUR':'The buyer accepted your offer',
    'MFIVE': 'The owner sent you the encrypted idea',
    'MSIX': 'The buyer commits to the procedure',
    'MSEVEN':'',
    'MEIGHT': '',
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
