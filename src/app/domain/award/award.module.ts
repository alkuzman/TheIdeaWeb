/**
 * Created by AKuzmanoski on 26/02/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {AwardItemComponent} from "./components/award-item/award-item.component";
import {AwardListComponent} from "./components/award-list/award-list.component";
import {BadgeModule} from "../bedge/badge.module";
@NgModule({
  imports: [SharedModule, BadgeModule],
  declarations: [AwardItemComponent, AwardListComponent],
  exports: [AwardItemComponent, AwardListComponent]
})
export class AwardModule {

}
