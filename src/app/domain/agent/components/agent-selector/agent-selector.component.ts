/**
 * Created by Viki on 1/25/2017.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Agent} from "../../../model/authentication/agent";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {User} from "../../../model/authentication/user";
@Component({
  moduleId: module.id,
  selector: "ideal-agent-selector",
  templateUrl: "agent-selector.component.html"
})
export class AgentSelectorComponent {
  @Input("searchPlaceholder") searchPlaceholder: string = "Select agents";
  @Input("duplicateEntryError") duplicateEntryError: string = " already exists";
  @Output("agentAdded") agentAdded: EventEmitter<Agent> = new EventEmitter<Agent>();
  @Output("agentRemoved") agentRemoved: EventEmitter<Agent> = new EventEmitter<Agent>();
  @Output("agentListChanged") agentListChanged: EventEmitter<Agent[]> = new EventEmitter<Agent[]>();
  agents: Agent[] = [];

  constructor(private snackBar: MdSnackBar) {

  }

  public onAgentSelected(agent: Agent) {
    if (this.exists(agent)) {
      let message: string = this.getName(agent) + " " + this.duplicateEntryError;
      this.snackBar.open(message, undefined, <MdSnackBarConfig>{duration: 3000});
    } else {
      this.agents.push(agent);
      this.agentAdded.emit(agent);
      this.agentListChanged.emit(this.agents);
    }
  }

  getName(agent: Agent): string {
    if (agent.type == "User") {
      let user: User = <User>agent;
      return user.firstName + " " + user.lastName;
    } else {
      return agent.name;
    }
  }

  exists(agent: Agent): boolean {
    for (let a of this.agents) {
      if (agent.id == a.id)
        return true;
    }
    return false;
  }

  remove(agent: Agent, index: number) {
    this.agents.splice(index, 1);
    this.agentRemoved.emit(agent);
    this.agentListChanged.emit(this.agents);
  }

  public getClass(agent: Agent): string {
    if (agent.type == "User")
      return "user-theme";
    return "organization-theme";
  }
}
