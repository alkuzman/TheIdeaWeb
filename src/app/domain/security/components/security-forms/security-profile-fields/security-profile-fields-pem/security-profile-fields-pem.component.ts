import {Component, Input} from "@angular/core";
/**
 * Created by Viki on 2/12/2017.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-security-profile-fields-certificate",
  templateUrl: "security-profile-fields-pem.component.html"
})
export class SecurityProfileFieldsPemComponent {
  @Input("value") value: string;
  @Input("title") title: string;

  constructor() {
  }
}
