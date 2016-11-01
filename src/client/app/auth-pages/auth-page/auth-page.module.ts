import {NgModule} from "@angular/core";
import {AuthPageRoutingModule} from "./auth-page-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {AuthPageComponent} from "./components/auth-page.component";
import {UserModule} from "../../core/user/user.module";
/**
 * Created by Viki on 10/28/2016.
 */


@NgModule({
  imports: [SharedModule, AuthPageRoutingModule, UserModule],
  declarations: [AuthPageComponent]
})
export class AuthPageModule {

}
