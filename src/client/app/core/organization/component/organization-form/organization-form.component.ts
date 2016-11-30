import {Component, Input, EventEmitter, Output} from "@angular/core";
import {Organization} from "../../../model/authentication/organization";
/**
 * Created by Viki on 11/23/2016.
 */

@Component({
  moduleId: module.id,
  selector: 'ideal-organization-form',
  templateUrl: 'organization-form.component.html'
})
export class OrganizationFormComponent {
  @Input("organization") organization: Organization;
  @Input("buttonText") buttonText: string = "Create";
  @Output("organizationCompleted") organizationCompleted: EventEmitter<Organization> = new EventEmitter<Organization>();


  continue(event: Event) {
    event.preventDefault();
    console.log(this.organization);
    this.organizationCompleted.emit(this.organization);
  }
}
