/**
 * Created by AKuzmanoski on 24/01/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {NewNoticeFormComponent} from "./components/notice-forms/new-notice-form/new-notice-form.component";
@NgModule({
  imports: [SharedModule],
  declarations: [NewNoticeFormComponent],
  exports: [NewNoticeFormComponent]
})
export class NoticeModule {

}
