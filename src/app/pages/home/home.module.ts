import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {HomeComponent} from "./home.component";
import {ModuleService} from "./module/module.service";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [ModuleService]
})
export class HomeModule {

}
