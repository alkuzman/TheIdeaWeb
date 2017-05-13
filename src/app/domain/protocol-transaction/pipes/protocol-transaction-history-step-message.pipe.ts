import {Pipe, PipeTransform} from "@angular/core";
/**
 * Created by Viki on 4/8/2017.
 */


@Pipe({
    name: "protocolTransactionHistoryStepMessage"
})
export class ProtocolTransactionHistoryStepMessagePipe implements PipeTransform {
    transform(value: string, ...args: any[]) {
        if (args[0] == args[1]) {
            return this.myMessages[value];
        }
        return this.otherPartyMessages[value];
    }

    private myMessages = {
        "ProtocolTransactionStepOneNotice": "You sent a buying request",
        "ProtocolTransactionStepTwoNotice": "You responded to the buying request",
        "ProtocolTransactionStepThreeNotice": "You accepted the final offer",
        "ProtocolTransactionStepFourNotice": "You sent the goods encrypted",
        "ProtocolTransactionStepFiveNotice": "",
        "ProtocolTransactionStepSixNotice": "",
        "ProtocolTransactionStepSevenNotice": "",
        "ProtocolTransactionStepEightNotice": ""
    }

    private otherPartyMessages = {
        "ProtocolTransactionStepOneNotice": "The other party sent you buying request",
        "ProtocolTransactionStepTwoNotice": "The other party responded to your buying request",
        "ProtocolTransactionStepThreeNotice": "The other party accepted your final offer",
        "ProtocolTransactionStepFourNotice": "The other party sent the goods encrypted",
        "ProtocolTransactionStepFiveNotice": "",
        "ProtocolTransactionStepSixNotice": "",
        "ProtocolTransactionStepSevenNotice": "",
        "ProtocolTransactionStepEightNotice": ""
    }

}