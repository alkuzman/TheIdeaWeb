import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SecurityProfileInitializationPageComponent} from "./security-profile-initialization-page.component";

const routes: Routes = [
  {
    path: '',
    component: SecurityProfileInitializationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityProfileInitializationPageRoutingModule { }
