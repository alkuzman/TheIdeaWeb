/**
 * Created by Viki on 1/25/2017.
 */
import {SharedModule} from "../../shared/shared.module";
import {NgModule} from "@angular/core";
import {AgentSearchComponent} from "./components/agent-serach/agent-search.component";
import {UserModule} from "../user/user.module";
import {AgentListItemComponent} from "./components/agent-list-item/agent-list-item.component";
import {AgentSelectorComponent} from "./components/agent-selector/agent-selector.component";
@NgModule({
  imports: [SharedModule, UserModule],
  declarations: [AgentListItemComponent, AgentSearchComponent, AgentSelectorComponent],
  exports: [AgentListItemComponent, AgentSearchComponent, AgentSelectorComponent]
})
export class AgentModule {

}
