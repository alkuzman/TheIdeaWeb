/**
 * Created by AKuzmanoski on 19/10/2016.
 */


import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {SharedModule} from "../shared/shared.module";
import {UserModule} from "../domain/user/user.module";
import {HomeModule} from "./home/home.module";
import {NavbarComponent} from "./components/navbar.component";
import {SearchComponent} from "./components/search/search.component";
import {ContentComponent} from "./content.component";
import {SharableResolverService} from "./sharable-resolver.service";
@NgModule({
  imports: [SharedModule, UserModule, HomeModule],
  declarations: [SearchComponent, NavbarComponent, ContentComponent, PagesComponent],
  exports: [PagesComponent],
  providers: [SharableResolverService]
})
export class PagesModule {
}
