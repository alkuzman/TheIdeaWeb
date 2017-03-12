/**
 * Created by AKuzmanoski on 08/03/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {BadgeIconResolverService} from "./badge-icon-resolver.service";
import {BadgeButtonComponent} from "./badge-button/badge-button.component";
@NgModule({
  imports: [SharedModule],
  providers: [BadgeIconResolverService],
  declarations: [BadgeButtonComponent],
  exports: [BadgeButtonComponent]
})
export class BadgeModule {

}
