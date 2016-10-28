/**
 * Created by AKuzmanoski on 15/10/2016.
 */
import { NgModule }     from '@angular/core';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {routes} from "./app.routes";

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
