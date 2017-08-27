import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HelpComponent} from "./help.component";
import {HelpRoutes} from "./help.routes";


@NgModule({
  imports: [RouterModule.forChild(HelpRoutes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
