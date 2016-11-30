import {NgModule} from "@angular/core";
import {NewOrganizationFormComponent} from "./component/new-organization-form/new-organization-form.component";
import {OrganizationFormComponent} from "./component/organization-form/organization-form.component";
import {OrganizationFieldsComponent} from "./component/organization-fields/organization-fields.component";
import {SharedModule} from "../../shared/shared.module";
import {OrganizationService} from "./organization.service";
/**
 * Created by Viki on 11/23/2016.
 */


@NgModule({
  imports: [SharedModule.forRoot()],
  declarations: [NewOrganizationFormComponent, OrganizationFormComponent, OrganizationFieldsComponent],
  exports: [NewOrganizationFormComponent, OrganizationFormComponent, OrganizationFieldsComponent],
  providers: [OrganizationService]
})
export class OrganizationModule {
}
