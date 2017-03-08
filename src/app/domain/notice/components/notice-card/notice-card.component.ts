import {Component, Input} from "@angular/core";
import {Notice} from "../../../model/sharing/notice";
/**
 * Created by Viki on 3/2/2017.
 */



@Component({
    moduleId: module.id,
    selector: 'ideal-notice-card',
    templateUrl: 'notice-card.component.html'
})
export class NoticeCardComponent {
    @Input("notice") notice: Notice;
    private buyingTransactionNotice: string = "BuyingTransactionNotice";

    constructor() {}
}