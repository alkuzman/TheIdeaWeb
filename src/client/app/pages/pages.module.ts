/**
 * Created by AKuzmanoski on 19/10/2016.
 */


import {NgModule} from "@angular/core";
import {PagesComponent} from "./pages.component";
import {SharedModule} from "../shared/shared.module";
import {HomeModule} from "./home/home.module";
import {AboutModule} from "./about/about.module";
import {ProblemPagesModule} from "./problem-pages/problem-pages.module";
@NgModule({
  imports: [SharedModule.forRoot(), HomeModule, AboutModule, ProblemPagesModule],
  declarations: [PagesComponent],
  exports: [PagesComponent],
  providers: []
})
export class PagesModule {

}
