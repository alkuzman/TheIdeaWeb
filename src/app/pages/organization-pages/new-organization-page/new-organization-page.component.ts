import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Organization} from "../../../domain/model/authentication/organization";
/**
 * Created by Viki on 11/21/2016.
 */


@Component({
  moduleId: module.id,
  selector: 'ideal-new-organization-page',
  templateUrl: 'new-organization-page.component.html'
})
export class NewOrganizationPageComponent {

  constructor(private router: Router) {
  }

  organizationAdded(organization: Organization) {
    //this.router.navigateByUrl("");
  }

  error(error: any) {
  }
}
