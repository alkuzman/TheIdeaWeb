import {NgModule} from "@angular/core";
import {SecurityUserDetailsComponent} from "./components/security-user-details/security-user-details.component";
import {SharedModule} from "../../shared/shared.module";
import {SecurityFieldsEncryptionPasswordComponent} from "./components/security-forms/security-fields-encryption-password/security-fields-encryption-password.component";
import {SecurityFormEncryptionPasswordComponent} from "./components/security-forms/security-form-encryption-password/security-form-encryption-password.component";
import {SecurityProfileFieldsTabsComponent} from "./components/security-forms/security-profile-fields-tabs/security-profile-fields-tabs.component";
import {SecurityProfileFieldsPemComponent} from "./components/security-forms/security-profile-fields/security-profile-fields-pem/security-profile-fields-pem.component";
import {SecurityProfileFieldsPrivateKeyComponent} from "./components/security-forms/security-profile-fields/security-profile-fields-private-key/security-profile-fields-private-key.component";
/**
 * Created by Viki on 2/6/2017.
 */


@NgModule({
  imports: [SharedModule],
  declarations: [SecurityUserDetailsComponent, SecurityFieldsEncryptionPasswordComponent,
    SecurityFormEncryptionPasswordComponent, SecurityProfileFieldsTabsComponent,
    SecurityProfileFieldsPemComponent, SecurityProfileFieldsPrivateKeyComponent],
  exports: [SecurityUserDetailsComponent, SecurityFieldsEncryptionPasswordComponent,
    SecurityFormEncryptionPasswordComponent, SecurityProfileFieldsTabsComponent,
    SecurityProfileFieldsPemComponent, SecurityProfileFieldsPrivateKeyComponent]
})
export class SecurityModule {

}
