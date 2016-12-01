import {Component, Output, EventEmitter, OnInit, ViewContainerRef} from "@angular/core";
import {Organization} from "../../../model/authentication/organization";
import {OrganizationService} from "../../organization.service";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
/**
 * Created by Viki on 11/23/2016.
 */


@Component({
  moduleId: module.id,
  selector: 'ideal-new-organization-form',
  templateUrl: 'new-organization-form.component.html'
})
export class NewOrganizationFormComponent implements OnInit {
  organization: Organization;
  @Output("organizationAdded") organizationAdded: EventEmitter<Organization> = new EventEmitter<Organization>();
  @Output("error") error: EventEmitter<Organization> = new EventEmitter<Organization>();

  constructor(private organizationService: OrganizationService,
              private snackBar: MdSnackBar,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.organization = new Organization();
  }

  addOrganization(organization: Organization) {
    this.organizationService.addOrganization(organization)
      .subscribe((organization: Organization) => this.onOrganizationAdded(organization), (error: any) => this.onError(error));
  }

  onOrganizationAdded(organization: Organization): void {
    let settings = new MdSnackBarConfig();
    let simpleSnackBarRef = this.snackBar.open("Organization Added", null, settings);
    setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), 3000);
    this.organizationAdded.emit(organization);
  }

  onError(error: any): void {
    let settings = new MdSnackBarConfig();
    let simpleSnackBarRef = this.snackBar.open("Something went wrong. Try Again", null, settings);
    setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), 3000);
    this.error.emit(error);
  }
}
