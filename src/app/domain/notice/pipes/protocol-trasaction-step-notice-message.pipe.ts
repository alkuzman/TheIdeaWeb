import {Pipe, PipeTransform} from "@angular/core";
import {ProtocolTransactionStepNotice} from "../../model/security/notices/protocol-transaction-step-notice";
import {ProtocolTransactionStepOneNotice} from "../../model/security/notices/protocol-transaction-step-one-notice";
import {ProtocolTransactionStepTwoNotice} from "../../model/security/notices/protocol-transaction-step-two-notice";
import {ProtocolTransactionStepThreeNotice} from "../../model/security/notices/protocol-transaction-step-three-notice";

/**
 * Created by Viki on 3/3/2017.
 */


@Pipe({
    name: "protocolTransactionStepNoticeMessage"
})
export class ProtocolTransactionStepNoticeMessagePipe implements PipeTransform {
    private messages = {
        'MONE': 'You have been sent buying request',
        'MTWO': 'The owner has responded on your buying request',
        'MTHREE': 'The buyer accepted your offer',
        'MFOUR': 'The owner sent you the goods',
        'MFIVE': 'The buyer sent you paying information'
    };

    transform(value: ProtocolTransactionStepNotice<any>, args: any[]): any {
        if (value.type == "ProtocolTransactionStepOneNotice") {
            return this.messages['MONE'];
        }
        if (value.type == "ProtocolTransactionStepTwoNotice") {
            return this.messages['MTWO'];
        }
        if (value.type == "ProtocolTransactionStepThreeNotice") {
            return this.messages['MTHREE'];
        }
        if (value.type == "ProtocolTransactionStepFourNotice") {
            return this.messages['MFOUR'];
        }
        if (value.type == "ProtocolTransactionStepFiveNotice") {
            return this.messages['MFIVE'];
        }
    }
}
