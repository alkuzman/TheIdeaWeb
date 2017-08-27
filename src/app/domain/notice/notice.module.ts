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
import {ProtocolTransactionStepNoticeCardComponent} from "./components/notice-card/protocol-transaction-step-notice-card/protocol-transaction-step-notice-card.component";
import {UserModule} from "../user/user.module";
import {ProtocolTransactionStepNoticeMessagePipe} from "./pipes/protocol-trasaction-step-notice-message.pipe";
import { NewPackageNoticeCardComponent } from './components/notice-card/new-package-notice-card/new-package-notice-card.component';
import {WidgetModule} from "../../shared/widget/widget.module";
import { SendNoticeFormComponent } from './components/notice-forms/send-notice-form/send-notice-form.component';
import {SharableModule} from "../sharable/sharable.module";
@NgModule({
  imports: [SharedModule, PackageModule, AgentModule, UserModule, WidgetModule, SharableModule],
  declarations: [NoticeFieldsComponent, NoticeSubmitLabelPipe, NoticeFormComponent, NewNoticeFormComponent,
    NoticeListComponent, NoticeListLoaderComponent, NoticeCardComponent, ProtocolTransactionStepNoticeCardComponent,
    ProtocolTransactionStepNoticeMessagePipe,
    NewPackageNoticeCardComponent,
    SendNoticeFormComponent],
  exports: [NoticeFieldsComponent, NoticeFormComponent, NewNoticeFormComponent, NoticeListComponent,
    NoticeListLoaderComponent, NoticeCardComponent, ProtocolTransactionStepNoticeCardComponent,
    ProtocolTransactionStepNoticeMessagePipe, NewPackageNoticeCardComponent, SendNoticeFormComponent]
})
export class NoticeModule {

}
