/**
 * Created by AKuzmanoski on 22/12/2016.
 */
import {SharedModule} from "../../../shared/shared.module";
import {UserModule} from "../../../domain/user/user.module";
import {NgModule} from "@angular/core";
import {UserDetailsPageComponent} from "./user-details-page.component";
import {UserDetailsPageRoutingModule} from "./user-details-page-routing.module";
import {IdeaModule} from "../../../domain/idea/idea.module";
import {ProblemModule} from "../../../domain/problem/problem.module";
@NgModule({
  imports: [SharedModule, UserModule, IdeaModule, ProblemModule, UserDetailsPageRoutingModule],
  declarations: [UserDetailsPageComponent]
})
export class UserDetailsPageModule {

}
