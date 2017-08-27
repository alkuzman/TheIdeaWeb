import {Component, Input} from "@angular/core";
import {RedirectService} from "../../../../../core/navigation/redirect.service";
import {ProtocolTransactionStepNotice} from "../../../../model/security/notices/protocol-transaction-step-notice";
import {Agent} from "../../../../model/authentication/agent";
/**
 * Created by Viki on 3/2/2017.
 */


@Component({
    moduleId: module.id,
    selector: 'ideal-protocol-transaction-step-notice-card',
    templateUrl: 'protocol-transaction-step-notice-card.component.html'
})
export class ProtocolTransactionStepNoticeCardComponent {
    @Input("notice") notice: ProtocolTransactionStepNotice<any>;

    constructor(private redirectService: RedirectService) {
    }

    public getSender(): void {
        this.redirectService.getUserDetails(this.notice.originator.id);
    }

    public getContent(): void {
        this.redirectService.getTransactionDetails(this.notice);
    }

    public getIdea(): void {
        this.redirectService.getIdeaDetails(this.notice.protocolSession.digitalGoods.id);
    }
}
