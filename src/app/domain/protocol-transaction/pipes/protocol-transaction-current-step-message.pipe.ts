import {Pipe, PipeTransform} from "@angular/core";
/**
 * Created by Viki on 4/8/2017.
 */


@Pipe({
    name: "protocolTransactionCurrentStepMessage"
})
export class ProtocolTransactionCurrentStepMessagePipe implements PipeTransform {
    transform(value: string, ...args: any[]) {
        if (args[0] == "contract")
            return this.contractMessages[value];
        return this.moneyMessages[value];
    }

    private contractMessages = {
        "Begin": "You initialized a buying protocol. Please click continue in order to propose a contract.",
        "ProtocolTransactionStepOneNotice": "You received a buying request. Please click continue in order to " +
            "accept or change the proposed contract.",
        "ProtocolTransactionStepTwoNotice": "You received a response on your buying request. " +
            "Please click continue in order to accept or change the proposed contract.",
        "ProtocolTransactionStepThreeNotice": "The contract you sent was accepted. Please click continue in order to " +
            "continue with the transaction",
        "ProtocolTransactionStepFourNotice": "You are in possession of the encrypted idea. Be advised, if you choose to " +
            "continue now, you cannot abort the protocol in a later stage.",
        "ProtocolTransactionStepFiveNotice": "You are in possession of a signed contract. If you choose to continue " +
            "now, you cannot abort the protocol in a later stage.",
        "ProtocolTransactionStepSixNotice": "",
        "ProtocolTransactionStepSevenNotice": "",
        "ProtocolTransactionStepEightNotice": ""
    };

    private moneyMessages = {
        "Begin": "You initialized a buying protocol. Please click continue in order to propose a price.",
        "ProtocolTransactionStepOneNotice": "You received a buying request. Please click continue in order to " +
            "accept or change the proposed price.",
        "ProtocolTransactionStepTwoNotice": "You received a response on your buying request. " +
            "Please click continue in order to accept or change the proposed price.",
        "ProtocolTransactionStepThreeNotice": "The price you sent was accepted. Please click continue in order to " +
            "continue with the transaction",
        "ProtocolTransactionStepFourNotice": "You are in possession of the encrypted idea. Please click continue and " +
            "enter payment details. Be advised, if you choose to continue now you cannot abort the protocol in a " +
            "later stage.",
        "ProtocolTransactionStepFiveNotice": "You are in possession of a payment details. If you choose to continue " +
            "now, you cannot abort the protocol in a later stage.",
        "ProtocolTransactionStepSixNotice": "",
        "ProtocolTransactionStepSevenNotice": "",
        "ProtocolTransactionStepEightNotice": ""
    };
}