/**
 * Created by Viki on 1/25/2017.
 */
import {Component, Output, EventEmitter, OnInit, Input} from "@angular/core";
import {Agent} from "../../../model/authentication/agent";
import {FormControl, FormGroup, FormBuilder} from "@angular/forms";
import {AgentService} from "../../../services/agent/agent.service";
import {User} from "../../../model/authentication/user";
@Component({
  moduleId: module.id,
  selector: "ideal-agent-search",
  templateUrl: "agent-search.component.html",
  styleUrls: ["agent-search.component.scss"]
})
export class AgentSearchComponent implements OnInit {
  @Output("agentSelected") agentSelected: EventEmitter<Agent> = new EventEmitter<Agent>();
  @Input("clearAfterSelect") clearAfterSelect: boolean = false;
  @Input("searchPlaceholder") searchPlaceholder: string = "Search";
  private form: FormGroup;
  private searchField: FormControl;
  private agents: Agent[] = [];

  constructor(private formBuilder: FormBuilder, private agentService: AgentService) {
  }

  ngOnInit(): void {
    this.searchField = this.formBuilder.control("");
    this.form = this.formBuilder.group({
      searchField: this.searchField
    });
    this.searchField.valueChanges.subscribe((value: string) => {
      this.search(value);
    });
  }

  search(query: string) {
    this.agentService.getAgents({query: query, limit: "5", offset: "0"}).subscribe((agents: Agent[]) => {
      this.agents = agents;
    });
  }

  onOptionSelected(agent: Agent) {
    this.agentSelected.emit(agent);
  }

  getValue(agent: Agent) {
    if (this.clearAfterSelect)
      return "";
    else {
      if (agent.type == "User") {
        let user: User = <User>agent;
        return user.firstName + " " + user.lastName;
      } else {
        return agent.name;
      }
    }
  }
}
