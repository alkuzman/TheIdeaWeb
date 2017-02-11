/**
 * Created by AKuzmanoski on 02/01/2017.
 */
import {RouterModule} from "@angular/router";
import {NewAnnouncementPageRoutes} from "./new-annoucement-page.routes";
import {NgModule} from "@angular/core";
@NgModule({
  imports: [RouterModule.forChild(NewAnnouncementPageRoutes)],
  exports: [RouterModule]
})
export class NewAnnouncementPageRoutingModule {

}
