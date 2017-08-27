import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MdSlideToggleChange} from "@angular/material";
import {RedirectService} from "../../../../core/navigation/redirect.service";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../model/authentication/user";

/**
 * Created by Viki on 2/6/2017.
 */

var encoding = require("text-encoding");

@Component({
  moduleId: module.id,
  selector: "ideal-security-user-details",
  templateUrl: "security-user-details.component.html"
})
export class SecurityUserDetailsComponent implements OnInit {

  constructor(private redirectService: RedirectService) {

  }

  ngOnInit(): void {
  }


  initializeSecurityProfile() {
    this.redirectService.initSecurityProfile();
  }
}
