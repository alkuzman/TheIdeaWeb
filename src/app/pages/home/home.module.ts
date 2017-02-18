import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {HomeComponent} from "./home.component";
import {CategoriesService} from "./categories.service";

@NgModule({

  imports: [CommonModule, SharedModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {

}
