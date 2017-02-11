/**
 * Created by AKuzmanoski on 25/10/2016.
 */
import {NgModule} from "@angular/core";
import {IdeaPagesComponent} from "./idea-pages.component";
import {SharedModule} from "../../shared/shared.module";
import {IdeaPagesRoutingModule} from "./idea-pages-routing.module";
@NgModule({
  imports: [SharedModule, IdeaPagesRoutingModule],
  declarations: [IdeaPagesComponent],
  exports: [IdeaPagesComponent]
})
export class IdeaPagesModule {
}