import { NgModule } from '@angular/core';
import { AboutComponent } from './about.component';
import {AboutRoutingModule} from "./about-routing.module";
import {SharedModule} from "../../../../../dist/dev/app/shared/shared.module";


@NgModule({
    imports: [SharedModule, AboutRoutingModule],
    declarations: [AboutComponent],
    exports: [AboutComponent]
})
export class AboutModule { }
