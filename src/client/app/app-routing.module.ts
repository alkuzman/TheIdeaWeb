/**
 * Created by AKuzmanoski on 15/10/2016.
 */
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import {routes} from "./app.routes";

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
