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
@NgModule({
  imports: [SharedModule, PackageModule, AgentModule],
  declarations: [NoticeFieldsComponent, NoticeSubmitLabelPipe, NoticeFormComponent, NewNoticeFormComponent],
  exports: [NoticeFieldsComponent, NoticeFormComponent, NewNoticeFormComponent]
})
export class NoticeModule {

}
