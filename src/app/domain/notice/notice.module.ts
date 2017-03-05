/**
 * Created by AKuzmanoski on 24/01/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {NewNoticeFormComponent} from "./components/notice-forms/new-notice-form/new-notice-form.component";
import {NoticeFormComponent} from "./components/notice-forms/notice-form/notice-form.component";
import {NoticeFieldsComponent} from "./components/notice-forms/notice-fields/notice-fields.component";
import {NoticeSubmitLabelPipe} from "./pipes/notice-submit-label.pipe";
import {PackageModule} from "../package/package.module";
import {AgentModule} from "../agent/agent.module";
import {NoticeListComponent} from "./components/notice-list/notice-list.component";
import {NoticeListLoaderComponent} from "./components/notice-list/notice-list-loader/notice-list-loader.component";
import {NoticeCardComponent} from "./components/notice-card/notice-card.component";
import {BuyingTransactionNoticeCardComponent} from "./components/notice-card/buying-transaction-notice-card/buying-transaction-notice-card.component";
import {UserModule} from "../user/user.module";
import {BuyingTransactionNoticeMessageNumberPipe} from "./pipes/buying-transaction-notice-message-number.pipe";
@NgModule({
  imports: [SharedModule, PackageModule, AgentModule, UserModule],
  declarations: [NoticeFieldsComponent, NoticeSubmitLabelPipe, NoticeFormComponent, NewNoticeFormComponent,
    NoticeListComponent, NoticeListLoaderComponent, NoticeCardComponent, BuyingTransactionNoticeCardComponent,
    BuyingTransactionNoticeMessageNumberPipe],
  exports: [NoticeFieldsComponent, NoticeFormComponent, NewNoticeFormComponent, NoticeListComponent,
    NoticeListLoaderComponent, NoticeCardComponent, BuyingTransactionNoticeCardComponent,
    BuyingTransactionNoticeMessageNumberPipe]
})
export class NoticeModule {

}
