/**
 * Created by AKuzmanoski on 19/10/2016.
 */


import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {SharedModule} from "../shared/shared.module";
import {PagesRoutingModule} from "./pages-routing.module";
import {UserModule} from "../domain/user/user.module";
import {HomeModule} from "./home/home.module";
@NgModule({
  imports: [SharedModule, UserModule, HomeModule],
  declarations: [PagesComponent],
  exports: [PagesComponent],
  providers: []
})
export class PagesModule {

}
