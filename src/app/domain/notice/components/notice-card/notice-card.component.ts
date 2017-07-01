import {Component, Input} from "@angular/core";
import {Notice} from "../../../model/sharing/notice";
import {Recipient} from "../../../model/sharing/recipient";
import {UserService} from "../../../services/user/user.service";
/**
 * Created by Viki on 3/2/2017.
 */


@Component({
    moduleId: module.id,
    selector: 'ideal-notice-card',
    templateUrl: 'notice-card.component.html'
})
export class NoticeCardComponent {
    _notice: Notice;
    recipient: Recipient;
    protocolTransactionStepOneNoticeType: string = "ProtocolTransactionStepOneNotice";
    protocolTransactionStepTwoNoticeType: string = "ProtocolTransactionStepTwoNotice";
    protocolTransactionStepThreeNoticeType: string = "ProtocolTransactionStepThreeNotice";
    packageNoticeType: string = "NewPackageNotice";

    @Input("notice")
    set notice(value: Notice) {
        this._notice = value;
        this.findMeAsRecipient();
    }


    constructor(private userService: UserService) {

    }

    private findMeAsRecipient() {
        if (this.notice != null) {
            for(const r of this.notice.recipients) {
                if (r.agent.email === this.userService.getAuthenticatedUser().email) {
                    this.recipient = r;
                }
            }
        }
    }

    public open(): void {
        console.log("open");
    }
}
