import {NgModule} from "@angular/core";
import {SecurityUserDetailsComponent} from "./components/security-user-details/security-user-details.component";
import {SharedModule} from "../../shared/shared.module";
import {SecurityFieldsEncryptionPasswordComponent} from "./components/security-forms/security-fields-encryption-password/security-fields-encryption-password.component";
import {SecurityFormEncryptionPasswordComponent} from "./components/security-forms/security-form-encryption-password/security-form-encryption-password.component";
/**
 * Created by Viki on 2/6/2017.
 */


@NgModule({
  imports: [SharedModule],
  declarations: [SecurityUserDetailsComponent, SecurityFieldsEncryptionPasswordComponent,
    SecurityFormEncryptionPasswordComponent],
  exports: [SecurityUserDetailsComponent, SecurityFieldsEncryptionPasswordComponent,
    SecurityFormEncryptionPasswordComponent]
})
export class SecurityModule {

}
