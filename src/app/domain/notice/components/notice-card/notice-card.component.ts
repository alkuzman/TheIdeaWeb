import {Component, Input} from "@angular/core";
import {Notice} from "../../../model/sharing/notice";
import {UserService} from "../../../services/user/user.service";
import {NoticeService} from "../../../services/notice/notice.service";
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
    protocolTransactionStepOneNoticeType: string = "ProtocolTransactionStepOneNotice";
    protocolTransactionStepTwoNoticeType: string = "ProtocolTransactionStepTwoNotice";
    protocolTransactionStepThreeNoticeType: string = "ProtocolTransactionStepThreeNotice";
    protocolTransactionStepFourNoticeType: string = "ProtocolTransactionStepFourNotice";
    protocolTransactionStepFiveNoticeType: string = "ProtocolTransactionStepFiveNotice";
    packageNoticeType: string = "NewPackageNotice";

    constructor(private noticeService: NoticeService) {

    }

    public open(): void {
        if (this.notice != null) {
            console.log("open");
            this.noticeService.markAsOpen(this.notice.id).subscribe((returnedNotice: Notice) => {
                this.notice = returnedNotice;
            });
        }
    }
}
