/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {SharableService} from "./sharable.service";
import {SharableDetailsComponent} from "./components/sharable-details/sharable-details.component";
import {IdeaModule} from "../idea/idea.module";
import {ProblemModule} from "../problem/problem.module";
@NgModule({
  imports: [SharedModule, IdeaModule, ProblemModule],
  declarations: [SharableDetailsComponent],
  providers: [SharableService],
  exports: [SharableDetailsComponent]
})
export class SharableModule {

}
