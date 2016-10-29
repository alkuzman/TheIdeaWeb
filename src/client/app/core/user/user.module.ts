/**
 * Created by AKuzmanoski on 29/10/2016.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import className = webdriver.By.className;
import {UserNamedAvatarComponent} from "./component/user-named-avatar/user-named-avatar.component";
import {UserService} from "./user.service";
import {LoadUserNamedAvatarComponent} from "./component/load-user-named-avatar/load-user-named-avatar.component";
@NgModule({
  imports: [SharedModule],
  declarations: [UserNamedAvatarComponent, LoadUserNamedAvatarComponent],
  exports: [UserNamedAvatarComponent, LoadUserNamedAvatarComponent],
  providers: [UserService]
})
export class UserModule {

}
