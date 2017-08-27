/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Component, Input} from "@angular/core";
import {Shareable} from "../../../model/sharing/shareable";
@Component({
  moduleId: module.id,
  selector: "ideal-sharable-details",
  template: `
    <div [ngSwitch]="shareable?.type">
      <ideal-idea-details *ngSwitchCase="ideaType" [idea]="shareable"></ideal-idea-details>
      <ideal-problem-details *ngSwitchCase="problemType" [problem]="shareable"></ideal-problem-details>
    </div>
  `
})
export class SharableDetailsComponent {
  @Input("shareable") shareable: Shareable;
  ideaType: string = "Idea";
  problemType: string = "Problem";
}
