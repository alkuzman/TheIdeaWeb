import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {NoticePagesComponent} from "./notice-pages.component";
import {NoticePagesRoutingModule} from "./notice-pages-routing.module";
import {NoticeModule} from "../../domain/notice/notice.module";
/**
 * Created by Viki on 1/24/2017.
 */
@NgModule({
  imports: [SharedModule, NoticePagesRoutingModule],
  declarations: [NoticePagesComponent]
})
export class NoticePagesModule {

}
