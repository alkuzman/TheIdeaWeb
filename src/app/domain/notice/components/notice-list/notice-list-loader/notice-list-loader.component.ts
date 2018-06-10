import {Component, OnInit} from '@angular/core';
import {NoticeService} from '../../../../services/notice/notice.service';
import {Notice} from '../../../../model/sharing/notice';
import {Subscription} from 'rxjs';
import {SocketService} from '../../../../../core/socket/socket.service';

/**
 * Created by Viki on 3/2/2017.
 */


@Component({
    moduleId: module.id,
    selector: 'ideal-notice-list-loader',
    templateUrl: 'notice-list-loader.component.html'
})
export class NoticeListLoaderComponent implements OnInit {
    noticeList: Notice[];
    private socketNoticeSubscription: Subscription;


    constructor(private noticeService: NoticeService, private socketService: SocketService) {
    }

    ngOnInit() {
        this.getNotifications();
        this.noticeService.getAnnouncementList().subscribe((notices: Notice[]) => {
            this.noticeList = notices;
            this.markNoticesAsSeen();
        });
    }

    private markNoticesAsSeen() {
        this.noticeService.markAsSeen().subscribe(() => {
        });
    }

    private getNotifications() {
        this.socketNoticeSubscription = this.socketService.newNoticeMessage().subscribe((notice: Notice) => {
            if (this.noticeList == null) {
                this.noticeList = [];
            }
            this.noticeList.push(notice);
            this.markNoticesAsSeen();
        });
    }
}
