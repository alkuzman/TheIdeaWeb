/**
 * Created by Viki on 1/25/2017.
 */
import {Component, Input} from "@angular/core";
import {Agent} from "../../../model/authentication/agent";
@Component({
  moduleId: module.id,
  selector: "ideal-agent-list-item",
  templateUrl: "agent-list-item.component.html"
})
export class AgentListItemComponent {
  @Input("agent") agent: Agent;
}
