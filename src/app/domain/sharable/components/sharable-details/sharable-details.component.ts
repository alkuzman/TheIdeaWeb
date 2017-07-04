/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Component, Input} from "@angular/core";
import {Shareable} from "../../../model/sharing/sharable";
@Component({
  moduleId: module.id,
  selector: "ideal-sharable-details",
  template: `
  <div [ngSwitch]="sharable?.type">
    <ideal-idea-details *ngSwitchCase="ideaType" [idea]="sharable"></ideal-idea-details>
    <ideal-problem-details *ngSwitchCase="problemType" [problem]="sharable"></ideal-problem-details>
  </div>
  `
})
export class SharableDetailsComponent {
  @Input("sharable") sharable: Shareable;
  ideaType: string = "Idea";
  problemType: string = "Problem";
}
