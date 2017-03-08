import {NgModel} from "@angular/forms";
import {NgModule} from "@angular/core";
import {NoticeFeedPageComponent} from "./notice-feed-page.component";
import {SharedModule} from "../../../shared/shared.module";
import {NoticeModule} from "../../../domain/notice/notice.module";
import {NoticeFeedPageRoutingModule} from "./notice-feed-page-routing.module";
/**
 * Created by Viki on 3/2/2017.
 */


@NgModule({
  imports: [SharedModule, NoticeModule, NoticeFeedPageRoutingModule],
  declarations: [NoticeFeedPageComponent],
  exports: [NoticeFeedPageComponent]
})
export class NoticeFeedPageModule {}
