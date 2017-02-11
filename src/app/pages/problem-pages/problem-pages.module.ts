import {NgModule} from "@angular/core";
import {ProblemPagesComponent} from "./problem-pages.component";
import {SharedModule} from "../../shared/shared.module";
import {ProblemPagesRoutingModule} from "./problem-pages-routing.module";
/**
 * Created by AKuzmanoski on 24/10/2016.
 */
@NgModule({
  imports: [SharedModule.forRoot(), ProblemPagesRoutingModule],
  declarations: [ProblemPagesComponent],
  exports: [ProblemPagesComponent],
  providers: []
})
export class ProblemPagesModule {

}
