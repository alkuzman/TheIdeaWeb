/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component, Input} from "@angular/core";
import {Idea} from "../../../model/ideas/idea";
@Component({
  moduleId: module.id,
  selector: "ideal-idea-card",
  templateUrl: "idea-card.component.html",
  styleUrls: ["idea-card.component.css"]
})
export class IdeaCardComponent {
  @Input("idea") idea: Idea;
}
