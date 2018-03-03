import {Component, OnInit} from "@angular/core";
import {RedirectService} from "../../../../core/navigation/redirect.service";

/**
 * Created by Viki on 2/6/2017.
 */

const encoding = require("text-encoding");

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
