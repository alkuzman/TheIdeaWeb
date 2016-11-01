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
import {UserValueAccessorDirective} from "./directives/user-value-email-accessor.directive";
import {RegisterFormComponent} from "./component/register-form/register-form.component";
import {UserEmailFieldsComponent} from "./component/user-email/user-email-fields/user-email-fields.component";
import {UserEmailFormComponent} from "./component/user-email/user-email-form/user-email-form.component";
import {GetUserEmailFormComponent} from "./component/user-email/get-user-email-form/get-user-email-form.component";
import {UserHolder} from "./user-holder";
import className = webdriver.By.className;
@NgModule({
  imports: [SharedModule],
  declarations: [UserNamedAvatarComponent, LoadUserNamedAvatarComponent, RegisterFieldsComponent, UserValueAccessorDirective, RegisterFormComponent, UserEmailFieldsComponent, UserEmailFormComponent, GetUserEmailFormComponent],
  exports: [UserNamedAvatarComponent, LoadUserNamedAvatarComponent, RegisterFieldsComponent, UserValueAccessorDirective, RegisterFormComponent, UserEmailFieldsComponent, UserEmailFormComponent, GetUserEmailFormComponent],
  providers: [UserService, UserObjectService, UserHolder]
})
export class UserModule {

}
