import {NgModule} from "@angular/core";
import {UserPagesComponent} from "./user-pages.component";
import {UserPagesRoutingModule} from "./user-pages-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {UserModule} from "../../domain/user/user.module";
import {AuthenticationUserDetailsPageComponent} from "./authenticated-user-details-page.component";
/**
 * Created by AKuzmanoski on 22/12/2016.
 */

@NgModule({
  imports: [SharedModule, UserModule, UserPagesRoutingModule],
  declarations: [UserPagesComponent, AuthenticationUserDetailsPageComponent]
})
export class UserPagesModule {

}
