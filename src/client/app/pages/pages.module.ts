/**
 * Created by AKuzmanoski on 19/10/2016.
 */


import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {SharedModule} from "../shared/shared.module";
import {PagesRoutingModule} from "./pages-routing.module";
import {UserModule} from "../domain/user/user.module";
@NgModule({
  imports: [SharedModule, PagesRoutingModule, UserModule],
  declarations: [PagesComponent],
  exports: [PagesComponent],
  providers: []
})
export class PagesModule {

}
