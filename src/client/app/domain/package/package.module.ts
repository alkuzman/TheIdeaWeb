import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {PackageDetailsComponent} from "./components/package-details/package-details.component";
import {SharableModule} from "../sharable/sharable.module";
import {PackageFieldsComponent} from "./components/package-forms/package-fields/package-fields.component";
import {PackageCardComponent} from "./components/package-card/package-card.component";
/**
 * Created by AKuzmanoski on 05/01/2017.
 */
@NgModule({
  imports: [SharedModule, SharableModule],
  declarations: [PackageDetailsComponent, PackageFieldsComponent, PackageCardComponent],
  exports: [PackageDetailsComponent, PackageFieldsComponent, PackageCardComponent]
})
export class PackageModule {

}
