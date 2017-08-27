/**
 * Created by Viki on 1/25/2017.
 */
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Agent} from "../../../model/authentication/agent";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {User} from "../../../model/authentication/user";

@Component({
  moduleId: module.id,
  selector: "ideal-agent-selector",
  templateUrl: "agent-selector.component.html"
})
export class AgentSelectorComponent {
  @Input("searchPlaceholder") searchPlaceholder = "Select agents";
  @Input("duplicateEntryError") duplicateEntryError = " already exists";
  @Output("agentAdded") agentAdded: EventEmitter<Agent> = new EventEmitter<Agent>();
  @Output("agentRemoved") agentRemoved: EventEmitter<Agent> = new EventEmitter<Agent>();
  @Output("agentListChanged") agentListChanged: EventEmitter<Agent[]> = new EventEmitter<Agent[]>();
  agents: Agent[] = [];

  constructor(private snackBar: MatSnackBar) {

  }

  public onAgentSelected(agent: Agent) {
    if (this.exists(agent)) {
      const message: string = this.getName(agent) + " " + this.duplicateEntryError;
      this.snackBar.open(message, undefined, <MatSnackBarConfig>{duration: 3000});
    } else {
      this.agents.push(agent);
      this.agentAdded.emit(agent);
      this.agentListChanged.emit(this.agents);
    }
  }

  getName(agent: Agent): string {
    if (agent.type === "User") {
      const user: User = <User>agent;
      return user.firstName + " " + user.lastName;
    } else {
      return agent.name;
    }
  }

  exists(agent: Agent): boolean {
    for (const a of this.agents) {
      if (agent.id === a.id) {
        return true;
      }
    }
    return false;
  }

  remove(agent: Agent, index: number) {
    this.agents.splice(index, 1);
    this.agentRemoved.emit(agent);
    this.agentListChanged.emit(this.agents);
  }

  public getClass(agent: Agent): string {
    if (agent.type === "User") {
      return "user-theme";
    }
    return "organization-theme";
  }
}
