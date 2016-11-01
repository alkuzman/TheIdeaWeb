/**
 * Created by AKuzmanoski on 29/10/2016.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {UserNamedAvatarComponent} from "./component/user-named-avatar/user-named-avatar.component";
import {UserService} from "./user.service";
import {LoadUserNamedAvatarComponent} from "./component/load-user-named-avatar/load-user-named-avatar.component";
import {UserObjectService} from "./user-object.service";
import {RegisterFieldsComponent} from "./component/register-fields/register-fields.component";
import {UserEmailValueAccessorDirective} from "./directives/user-email-value-accessor.directive";
import {RegisterFormComponent} from "./component/register-form/register-form.component";
import {UserEmailFieldsComponent} from "./component/user-email/user-email-fields/user-email-fields.component";
import {UserEmailFormComponent} from "./component/user-email/user-email-form/user-email-form.component";
import {GetUserEmailFormComponent} from "./component/user-email/get-user-email-form/get-user-email-form.component";
import {UserHolder} from "./user-holder";
import {CheckUserPasswordFormComponent} from "./component/user-password/check-user-password-form/check-user-password-form.component";
import {UserPasswordFormComponent} from "./component/user-password/user-password-form/user-password-form.component";
import {UserPasswordFieldsComponent} from "./component/user-password/user-password-fields/user-password-fields.component";
import {UserPasswordValueAccessorDirective} from "./directives/user-password-value-accessor.directive";
import className = webdriver.By.className;
@NgModule({
  imports: [SharedModule],
  declarations: [UserNamedAvatarComponent, LoadUserNamedAvatarComponent, RegisterFieldsComponent, UserEmailValueAccessorDirective, RegisterFormComponent, UserEmailFieldsComponent, UserEmailFormComponent, GetUserEmailFormComponent, CheckUserPasswordFormComponent, UserPasswordFormComponent, UserPasswordFieldsComponent, UserPasswordValueAccessorDirective],
  exports: [UserNamedAvatarComponent, LoadUserNamedAvatarComponent, RegisterFieldsComponent, UserEmailValueAccessorDirective, RegisterFormComponent, UserEmailFieldsComponent, UserEmailFormComponent, GetUserEmailFormComponent, CheckUserPasswordFormComponent, UserPasswordFieldsComponent, UserPasswordFormComponent, UserPasswordValueAccessorDirective],
  providers: [UserService, UserObjectService, UserHolder]
})
export class UserModule {

}
