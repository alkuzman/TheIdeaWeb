/**
 * Created by AKuzmanoski on 29/10/2016.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import className = webdriver.By.className;
import {UserNamedAvatarComponent} from "./component/user-named-avatar/user-named-avatar.component";
import {UserService} from "./user.service";
import {LoadUserNamedAvatarComponent} from "./component/load-user-named-avatar/load-user-named-avatar.component";
import {UserObjectService} from "./user-object.service";
import {RegisterFieldsComponent} from "./component/register-fields/register-fields.component";
import {UserValueAccessorDirective} from "./directives/user-value-accessor.directive";
import {RegisterFormComponent} from "./component/register-form/register-form.component";
@NgModule({
  imports: [SharedModule],
  declarations: [UserNamedAvatarComponent, LoadUserNamedAvatarComponent, RegisterFieldsComponent, UserValueAccessorDirective, RegisterFormComponent],
  exports: [UserNamedAvatarComponent, LoadUserNamedAvatarComponent, RegisterFieldsComponent, UserValueAccessorDirective, RegisterFormComponent],
  providers: [UserService, UserObjectService]
})
export class UserModule {

}
