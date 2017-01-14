/**
 * Created by AKuzmanoski on 02/01/2017.
 */
import {RouterModule} from "@angular/router";
import {NewAnnouncementPageRoutes} from "./new-annoucement-page.routes";
import {NgModule} from "@angular/core";
import {SharableResolverService} from "./sharable-resolver.service";
import {SharableModule} from "../../../domain/sharable/sharable.module";
@NgModule({
  imports: [RouterModule.forChild(NewAnnouncementPageRoutes)],
  exports: [RouterModule],
  providers: [SharableResolverService]
})
export class NewAnnouncementPageRoutingModule {

}
