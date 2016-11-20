/**
 * Created by Viki on 10/26/2016.
 */

import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {AuthPagesRoutingModule} from "./auth-pages-routing.module";
import {AuthPagesComponent} from "./components/auth-pages.component";
import {AuthCardComponent} from "./components/auth-card/auth-card.component";
import {UserModule} from "../core/user/user.module";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {LoginPageComponent} from "./login-page/components/login-page.component";
import {AuthPageComponent} from "./auth-page/components/auth-page.component";

@NgModule({
  imports: [SharedModule.forRoot(), AuthPagesRoutingModule, UserModule],
  declarations: [AuthPagesComponent, AuthCardComponent, LoginPageComponent, RegisterPageComponent, AuthPageComponent]
})
export class AuthPagesModule {}