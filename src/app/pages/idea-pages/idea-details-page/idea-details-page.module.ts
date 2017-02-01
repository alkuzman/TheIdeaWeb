/**
 * Created by AKuzmanoski on 03/12/2016.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {IdeaDetailsPageComponent} from "./idea-details-page.component";
import {IdeaDetailsPageRoutingModule} from "./idea-details-page-routing.module";
import {IdeaModule} from "../../../domain/idea/idea.module";
@NgModule({
  imports: [SharedModule, IdeaModule, IdeaDetailsPageRoutingModule],
  declarations: [IdeaDetailsPageComponent],
  exports: [IdeaDetailsPageComponent]
})
export class IdeaDetailsPageModule {


}
