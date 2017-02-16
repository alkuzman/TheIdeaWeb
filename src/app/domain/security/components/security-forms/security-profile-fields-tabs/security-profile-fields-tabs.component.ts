import {Component, Input, OnInit} from "@angular/core";
/**
 * Created by Viki on 2/12/2017.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-security-profile-fields-tabs",
  templateUrl: "security-profile-fields-tabs.component.html"
})
export class SecurityProfileFieldsTabsComponent implements OnInit {
  ngOnInit(): void {
    //console.log(this.certificationRequestPEM);
  }

  @Input("certificateEPEM") certificateEPEM: string;
  @Input("certificateSPEM") certificateSPEM: string;
  @Input("certificationRequestEPEM") certificationRequestEPEM: string;
  @Input("certificationRequestSPEM") certificationRequestSPEM: string;
  @Input("privateKeyEEncrypted") privateKeyEEncrypted: string;
  @Input("privateKeySEncrypted") privateKeySEncrypted: string;

  constructor() {

  }

}
