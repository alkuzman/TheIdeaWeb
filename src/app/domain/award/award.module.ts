/**
 * Created by AKuzmanoski on 26/02/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {AwardItemComponent} from "./components/award-item/award-item.component";
import {AwardListComponent} from "./components/award-list/award-list.component";
@NgModule({
  imports: [SharedModule],
  declarations: [AwardItemComponent, AwardListComponent],
  exports: [AwardItemComponent, AwardListComponent]
})
export class AwardModule {

}
