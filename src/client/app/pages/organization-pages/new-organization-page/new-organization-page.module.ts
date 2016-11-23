import {NgModule} from "@angular/core";
import {NewOrganizationPageComponent} from "./new-organization-page.component";
import {SharedModule} from "../../../shared/shared.module";
import {NewOrganizationPageRoutingModule} from "./new-organization-page-routing.module";
/**
 * Created by Viki on 11/21/2016.
 */


@NgModule({
  imports: [SharedModule, NewOrganizationPageRoutingModule],
  declarations: [NewOrganizationPageComponent]
})
export class NewOrganizationPageModule {
}
