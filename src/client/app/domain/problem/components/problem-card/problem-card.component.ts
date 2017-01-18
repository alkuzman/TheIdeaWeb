/**
 * Created by AKuzmanoski on 24/10/2016.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Problem} from "../../../model/ideas/problem";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-card",
  templateUrl: "problem-card.component.html",
  styleUrls: ["problem-card.component.css"]
})
export class ProblemCardComponent {
  @Input("problem") problem: Problem;
  @Output("openContent") openContent: EventEmitter<void> = new EventEmitter<void>();

  getContent() {
    console.log("in Content");
    this.openContent.emit();
  }
}
