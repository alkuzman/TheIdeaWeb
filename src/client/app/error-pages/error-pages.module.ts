import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ErrorPagesRoutingModule} from "./error-pages-routing.module";
/**
 * Created by AKuzmanoski on 04/01/2017.
 */
@NgModule({
  imports: [SharedModule, ErrorPagesRoutingModule],
  declarations: [PageNotFoundComponent]
})
export class ErrorPagesModule {

}
