/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {NgModule} from "@angular/core";
import {IdeaPagesComponent} from "./idea-pages.component";
import {SharedModule} from "../../shared/shared.module";
import {IdeaPagesRoutingModule} from "./idea-pages-routing.module";
import {GuardsModule} from "../../guards/guards.module";
@NgModule({
  imports: [SharedModule.forRoot(), IdeaPagesRoutingModule, GuardsModule],
  declarations: [IdeaPagesComponent],
  exports: [IdeaPagesComponent]
})
export class IdeaPagesModule {
}
