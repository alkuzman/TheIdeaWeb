import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {RegisterPageComponent} from "./register-page.component";
import {RegisterPageRoutingModule} from "./register-page-routing.module";
/**
 * Created by AKuzmanoski on 29/10/2016.
 */

@NgModule({
  imports: [SharedModule, RegisterPageRoutingModule],
  declarations: [RegisterPageComponent],
  exports: []
})
export class RegisterPageModule {

}
