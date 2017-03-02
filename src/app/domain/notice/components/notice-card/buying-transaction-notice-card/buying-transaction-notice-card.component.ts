import {Component, Input} from "@angular/core";
import {Notice} from "../../../../model/sharing/notice";
import {BuyingTransactionNotice} from "../../../../model/security/buying-transaction-notice";
import {Agent} from "../../../../model/authentication/agent";
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

    public getSender(): void {

    }

    public getContent(): void {

    }
}