import {NgModule} from "@angular/core";
import {SecurityUserDetailsComponent} from "./components/security-user-details/security-user-details.component";
import {SharedModule} from "../../shared/shared.module";
/**
 * Created by Viki on 2/6/2017.
 */


@NgModule({
  imports: [SharedModule],
  declarations: [SecurityUserDetailsComponent],
  exports: [SecurityUserDetailsComponent]
})
export class SecurityModule {

}
