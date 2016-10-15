/**
 * Created by AKuzmanoski on 15/10/2016.
 */
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import {mainRoutes} from "./main-nav.routes";

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainNavRoutingModule { }
