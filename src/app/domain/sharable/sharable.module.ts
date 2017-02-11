/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {SharableDetailsComponent} from "./components/sharable-details/sharable-details.component";
import {IdeaModule} from "../idea/idea.module";
import {ProblemModule} from "../problem/problem.module";
import {SharableCardComponent} from "./components/sharable-card/sharable-card.component";
@NgModule({
  imports: [SharedModule, IdeaModule, ProblemModule],
  declarations: [SharableDetailsComponent, SharableCardComponent],
  exports: [SharableDetailsComponent, SharableCardComponent]
})
export class SharableModule {

}
