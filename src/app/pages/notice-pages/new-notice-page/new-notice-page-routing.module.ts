/**
 * Created by AKuzmanoski on 24/01/2017.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NewNoticePageRoutes} from "./new-notice-page.routes";
@NgModule({
  imports: [RouterModule.forChild(NewNoticePageRoutes)],
  exports: [RouterModule]
})
export class NewNoticePageRoutingModule {

}
