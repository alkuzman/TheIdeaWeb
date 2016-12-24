/**
 * Created by AKuzmanoski on 22/12/2016.
 */
import {SharedModule} from "../../../shared/shared.module";
import {UserModule} from "../../../domain/user/user.module";
import {NgModule} from "@angular/core";
import {UserDetailsPageComponent} from "./user-details-page.component";
import {UserDetailsPageRoutingModule} from "./user-details-page-routing.module";
@NgModule({
  imports: [SharedModule, UserModule, UserDetailsPageRoutingModule],
  declarations: [UserDetailsPageComponent]
})
export class UserDetailsPageModule {

}
