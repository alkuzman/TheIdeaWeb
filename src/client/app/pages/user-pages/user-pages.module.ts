import {NgModule} from "@angular/core";
import {UserPagesComponent} from "./user-pages.component";
import {UserPagesRoutingModule} from "./user-pages-routing.module";
import {SharedModule} from "../../shared/shared.module";
/**
 * Created by AKuzmanoski on 22/12/2016.
 */

@NgModule({
  imports: [SharedModule, UserPagesRoutingModule],
  declarations: [UserPagesComponent]
})
export class UserPagesModule {

}
