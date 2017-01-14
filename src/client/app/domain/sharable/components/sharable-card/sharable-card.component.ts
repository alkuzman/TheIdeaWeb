/**
 * Created by AKuzmanoski on 09/01/2017.
 */
import {Component, Input} from "@angular/core";
import {Sharable} from "../../../model/sharing/sharable";
@Component({
  moduleId: module.id,
  selector: "ideal-sharable-card",
  templateUrl: "sharable-card.component.html"
})
export class SharableCardComponent {
  @Input("sharable") sharable: Sharable;
  private ideaType = "Idea";
  private problemType = "Problem";
}
