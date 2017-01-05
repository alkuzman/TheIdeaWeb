/**
 * Created by AKuzmanoski on 03/01/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {AnnouncementService} from "./announcement.service";
import {SharableModule} from "../sharable/sharable.module";
import {AnnouncementFieldsComponent} from "./components/announcement-forms/announcement-fields/announcement-fields.component";
import {AnnouncementFormComponent} from "./components/announcement-forms/announcement-form/announcement-form.component";
import {NewAnnouncementFormComponent} from "./components/announcement-forms/new-announcement-form/new-announcement-form.component";
import {AnnouncementDetailsComponent} from "./components/announcement-details/announcement-details.component";
import {PackageModule} from "../package/package.module";
@NgModule({
  imports: [SharedModule, SharableModule, PackageModule],
  declarations: [AnnouncementFieldsComponent, AnnouncementFormComponent, NewAnnouncementFormComponent, AnnouncementDetailsComponent],
  providers: [AnnouncementService],
  exports: [AnnouncementFieldsComponent, AnnouncementFormComponent, NewAnnouncementFormComponent, AnnouncementDetailsComponent]
})
export class AnnouncementModule {

}
