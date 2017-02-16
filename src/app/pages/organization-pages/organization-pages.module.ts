import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {OrganizationPagesRoutingModule} from "./organization-pages-routing.module";
import {OrganizationPagesComponent} from "./organization-pages.component";
/**
 * Created by Viki on 11/21/2016.
 */


@NgModule({
  imports: [SharedModule, OrganizationPagesRoutingModule],
  declarations: [OrganizationPagesComponent],
  exports: [OrganizationPagesComponent]
})
export class OrganizationPagesModule {
}
