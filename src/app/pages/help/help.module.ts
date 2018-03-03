import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HelpRoutingModule} from './help-routing.module';
import {HelpComponent} from './help.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        HelpRoutingModule
    ],
    declarations: [HelpComponent],
    exports: [HelpComponent]
})
export class HelpModule {
}
