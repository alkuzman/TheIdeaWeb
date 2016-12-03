/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {IdeaModule} from "../../../domain/idea/idea.module";
import {IdeasPageComponent} from "./ideas-page.component";
import {IdeasPageRoutingModule} from "./ideas-page-routing.module";
@NgModule({
  imports: [SharedModule.forRoot(), IdeaModule, IdeasPageRoutingModule],
  declarations: [IdeasPageComponent],
  exports: [IdeasPageComponent]
})
export class IdeasPageModule {

}
