/**
 * Created by AKuzmanoski on 24/01/2017.
 */
import {Component, Input} from "@angular/core";
import {Sharable} from "../../../../model/sharing/sharable";
@Component({
  moduleId: module.id,
  selector: "ideal-new-notice-form",
  templateUrl: "new-notice-form.component.html"
})
export class NewNoticeFormComponent {
  @Input("sharable") sharable: Sharable;
}
