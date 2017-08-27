import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityProfileInitializationPageRoutingModule } from './security-profile-initialization-page-routing.module';
import { SecurityProfileInitializationPageComponent } from './security-profile-initialization-page.component';
import {SharedModule} from "../../../shared/shared.module";
import {SecurityModule} from "../../../domain/security/security.module";
import {UserModule} from "../../../domain/user/user.module";

@NgModule({
  imports: [
    CommonModule,
    SecurityProfileInitializationPageRoutingModule,
    SharedModule,
    UserModule,
    SecurityModule
  ],
  declarations: [SecurityProfileInitializationPageComponent]
})
export class SecurityProfileInitializationPageModule { }
