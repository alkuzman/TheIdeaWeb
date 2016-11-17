import {NgModule} from "@angular/core";
import {LoggedInGuard} from "./logged-in.guard";
import {UserModule} from "../core/user/user.module";
/**
 * Created by Viki on 11/17/2016.
 */

@NgModule({
  imports: [UserModule],
  providers: [LoggedInGuard]
})
export class GuardsModule {

}
