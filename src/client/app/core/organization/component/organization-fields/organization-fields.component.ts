import {Component, Input} from "@angular/core";
import {Organization} from "../../../model/authentication/organization";
import {AbstractValueAccessor, MakeProvider} from "../../../../shared/abstract-value-accessor";
/**
 * Created by Viki on 11/23/2016.
 */

@Component({
  moduleId: module.id,
  selector: 'ideal-organization-fields',
  templateUrl: 'organization-fields.component.html',
  styleUrls: ['organization-fields.component.css'],
  providers: [MakeProvider(OrganizationFieldsComponent)]
})
export class OrganizationFieldsComponent extends AbstractValueAccessor<Organization> {
  @Input("nameLabel") nameLabel: string = "Name";
  @Input("descriptionLabel") descriptionLabel: string = "Description";
  @Input("emailLabel") emailLabel: string = "Email";

  constructor() {
    super(new Organization());
  }
}
