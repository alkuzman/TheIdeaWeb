/**
 * Created by AKuzmanoski on 03/01/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {AbstractValueAccessor, MakeProvider} from "../../../../../shared/abstract-value-accessor";
import {Announcement} from "../../../../model/sharing/announcement";
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-fields",
  templateUrl: "announcement-fields.component.html",
  providers: [MakeProvider(AnnouncementFieldsComponent)]
})
export class AnnouncementFieldsComponent extends AbstractValueAccessor<Announcement> {
  constructor() {
    super(new Announcement());
  }
}
