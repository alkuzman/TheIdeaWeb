import {Component, Input, EventEmitter, Output, OnInit} from "@angular/core";
import {Organization} from "../../../model/authentication/organization";
import {FormGroup, FormBuilder} from "@angular/forms";
/**
 * Created by Viki on 11/23/2016.
 */

@Component({
  moduleId: module.id,
  selector: 'ideal-organization-form',
  templateUrl: 'organization-form.component.html'
})
export class OrganizationFormComponent implements OnInit {

  @Input("organization") organization: Organization;
  @Input("buttonText") buttonText: string = "Create";
  @Output("organizationCompleted") organizationCompleted: EventEmitter<Organization> = new EventEmitter<Organization>();

  active = true;
  form: FormGroup;
  fields: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.organization == null) {
      this.organization = new Organization();
    }
    this.fields = this.fb.group({});
    this.form = this.fb.group({
      fields: this.fields
    });
  }

  continue(event: Event) {
    this.submitted = true;
    if (this.form.valid) {
      this.organizationCompleted.emit(this.organization);
    }
    event.preventDefault();
    console.log(this.organization);
  }
}
