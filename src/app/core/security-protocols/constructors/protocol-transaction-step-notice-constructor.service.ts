import {Injectable} from "@angular/core";
import {ProtocolTransactionStepOneNotice} from "../../../domain/model/security/notices/protocol-transaction-step-one-notice";
import {ProtocolTransactionStepThreeNotice} from "../../../domain/model/security/notices/protocol-transaction-step-three-notice";
import {Idea} from "../../../domain/model/ideas/idea";
import {Agent} from "../../../domain/model/authentication/agent";
import {Recipient} from "../../../domain/model/sharing/recipient";
import {ProtocolTransactionStepTwoNotice} from "../../../domain/model/security/notices/protocol-transaction-step-two-notice";
import {ProtocolSession} from "../../../domain/model/security/protocol-session";
/**
 * Created by Viki on 3/10/2017.
 */


@Injectable()
export class ProtocolTransactionStepNoticeConstructor {

    public constructProtocolTransactionStepOneNotice(protocolSession: ProtocolSession, message: string,
                                                     originator: Agent,
                                                     previousNotice: ProtocolTransactionStepThreeNotice,
                                                     recipient: Agent): ProtocolTransactionStepOneNotice {
        let notice: ProtocolTransactionStepOneNotice = new ProtocolTransactionStepOneNotice();
        if (previousNotice != null) {
            notice.previousStepNotice = previousNotice;
        }
        notice.setProtocolSession(protocolSession);
        notice.setMessage(message);
        notice.setOriginator(originator);

        // Add recipient
        let recipients: Recipient[] = [];
        let tempRecipient = new Recipient();
        tempRecipient.agent = recipient;
        recipients.push(tempRecipient);
        notice.setRecipients(recipients);
        return notice;
    }

    public constructProtocolTransactionStepTwoNotice(protocolSession: ProtocolSession, message: string,
                                                     originator: Agent,
                                                     previousNotice: ProtocolTransactionStepOneNotice,
                                                     recipient: Agent): ProtocolTransactionStepTwoNotice {
        let notice: ProtocolTransactionStepTwoNotice = new ProtocolTransactionStepTwoNotice();
        notice.setPreviousStepNotice(previousNotice);
        notice.setProtocolSession(protocolSession);
        notice.setMessage(message);
        notice.setOriginator(originator);

        // Add recipient
        let recipients: Recipient[] = [];
        let tempRecipient = new Recipient();
        tempRecipient.agent = recipient;
        recipients.push(tempRecipient);
        notice.setRecipients(recipients);
        return notice;
    }
}