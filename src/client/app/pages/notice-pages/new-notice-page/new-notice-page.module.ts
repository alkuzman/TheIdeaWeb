/**
 * Created by AKuzmanoski on 24/01/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {NewNoticePageComponent} from "./new-notice-page.component";
import {NewNoticePageRoutingModule} from "./new-notice-page-routing.module";
import {NoticeModule} from "../../../domain/notice/notice.module";
@NgModule({
  imports: [SharedModule, NoticeModule, NewNoticePageRoutingModule],
  declarations: [NewNoticePageComponent],
})
export class NewNoticePageModule {

}
