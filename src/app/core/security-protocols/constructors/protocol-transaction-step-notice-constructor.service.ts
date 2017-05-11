import {Injectable} from "@angular/core";
import {ProtocolTransactionStepOneNotice} from "../../../domain/model/security/notices/protocol-transaction-step-one-notice";
import {ProtocolTransactionStepThreeNotice} from "../../../domain/model/security/notices/protocol-transaction-step-three-notice";
import {Idea} from "../../../domain/model/ideas/idea";
import {Agent} from "../../../domain/model/authentication/agent";
import {Recipient} from "../../../domain/model/sharing/recipient";
import {ProtocolTransactionStepTwoNotice} from "../../../domain/model/security/notices/protocol-transaction-step-two-notice";
import {ProtocolSession} from "../../../domain/model/security/protocol-session";
import {ProtocolTransactionStepNotice} from "../../../domain/model/security/notices/protocol-transaction-step-notice";
import {AbstractProtocolTransactionStepNotice} from "../../../domain/model/security/notices/abstract-protocol-transaction-step-notice";
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
            notice.setPreviousStepNotice(previousNotice);
        }
        return <ProtocolTransactionStepOneNotice>
            this.setNoticeProperties(notice, protocolSession, message, originator, recipient);
    }

    public constructProtocolTransactionStepTwoNotice(protocolSession: ProtocolSession, message: string,
                                                     originator: Agent,
                                                     previousNotice: ProtocolTransactionStepOneNotice,
                                                     recipient: Agent): ProtocolTransactionStepTwoNotice {
        let notice: ProtocolTransactionStepTwoNotice = new ProtocolTransactionStepTwoNotice();
        notice.setPreviousStepNotice(previousNotice);
        return <ProtocolTransactionStepTwoNotice>
            this.setNoticeProperties(notice, protocolSession, message, originator, recipient);
    }

    public constructProtocolTransactionStepThreeNotice(protocolSession: ProtocolSession, message: string,
                                                     originator: Agent,
                                                     previousNotice: ProtocolTransactionStepTwoNotice,
                                                     recipient: Agent): ProtocolTransactionStepThreeNotice {
        let notice: ProtocolTransactionStepThreeNotice = new ProtocolTransactionStepThreeNotice();
        notice.setPreviousStepNotice(previousNotice);
        return <ProtocolTransactionStepThreeNotice>
            this.setNoticeProperties(notice, protocolSession, message, originator, recipient);
    }

    private setNoticeProperties(notice: AbstractProtocolTransactionStepNotice<any>,
                                protocolSession: ProtocolSession, message: string,
                                originator: Agent, recipient: Agent): ProtocolTransactionStepNotice<any> {

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