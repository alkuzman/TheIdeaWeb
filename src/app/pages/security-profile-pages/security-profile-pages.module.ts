import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityProfilePagesRoutingModule } from './security-profile-pages-routing.module';
import { SecurityProfilePagesComponent } from './security-profile-pages.component';

@NgModule({
  imports: [
    CommonModule,
    SecurityProfilePagesRoutingModule
  ],
  declarations: [SecurityProfilePagesComponent]
})
export class SecurityProfilePagesModule { }
