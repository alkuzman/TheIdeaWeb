import {Component, Input} from "@angular/core";
import {Notice} from "../../../../model/sharing/notice";
import {BuyingTransactionNotice} from "../../../../model/security/buying-transaction-notice";
import {Agent} from "../../../../model/authentication/agent";
import {RedirectService} from "../../../../../core/navigation/redirect.service";
import {updateNotifierCheck} from "tslint/lib/updateNotifier";
/**
 * Created by Viki on 3/2/2017.
 */


@Component({
    moduleId: module.id,
    selector: 'ideal-buying-transaction-notice-card',
    templateUrl: 'buying-transaction-notice-card.component.html'
})
export class BuyingTransactionNoticeCardComponent {
    @Input("notice") notice: BuyingTransactionNotice;

    constructor(private redirectService: RedirectService) {
    }

    public getSender(): void {
      this.redirectService.getUserDetails(this.notice.buyingTransaction.idea.owner.id);
    }

    public getContent(): void {
      this.redirectService.getTransactionDetails(this.notice.buyingTransaction);
    }

    public getIdea(): void {
      this.redirectService.getIdeaDetails(this.notice.buyingTransaction.idea.id);
    }
}
