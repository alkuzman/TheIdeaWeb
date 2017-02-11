/**
 * Created by AKuzmanoski on 15/10/2016.
 */
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {PreloadSelectedModulesList} from "./preload-selected-modules-list";

@NgModule({
  providers: [PreloadSelectedModulesList],
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadSelectedModulesList
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
