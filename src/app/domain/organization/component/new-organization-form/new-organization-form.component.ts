import {Component, Output, EventEmitter, OnInit, Input} from "@angular/core";
import {Organization} from "../../../model/authentication/organization";
import {OrganizationService} from "../../../services/organization/organization.service";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {Member} from "../../../model/authentication/member";
import {MemberRole} from "../../../model/enumerations/member-role";
import {UserService} from "../../../services/user/user.service";
import {MemberService} from "../../../services/member/member.service";
/**
 * Created by Viki on 11/23/2016.
 */


@Component({
  moduleId: module.id,
  selector: 'ideal-new-organization-form',
  templateUrl: 'new-organization-form.component.html'
})
export class NewOrganizationFormComponent implements OnInit {
  @Input("buttonText") buttonText: string = "Create";
  organization: Organization;
  @Output("organizationAdded") organizationAdded: EventEmitter<Organization> = new EventEmitter<Organization>();
  @Output("error") error: EventEmitter<Organization> = new EventEmitter<Organization>();

  constructor(private organizationService: OrganizationService, private userService: UserService,
              private memberService: MemberService, private snackBar: MdSnackBar,) {
  }

  ngOnInit(): void {
    this.organization = new Organization();
  }

  addOrganization(organization: Organization) {
    let member: Member = new Member();
    member.organization = organization;
    member.user = this.userService.getAuthenticatedUser();
    member.role = MemberRole.OWNER;
    this.memberService.save(member).subscribe((member: Member) => this.onOrganizationAdded(organization),
      (error: any) => this.onError(error));
  }

  onOrganizationAdded(organization: Organization): void {
    let settings = new MdSnackBarConfig();
    let simpleSnackBarRef = this.snackBar.open("Organization Created", null, settings);
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
