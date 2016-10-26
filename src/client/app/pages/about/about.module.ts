import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule } from '@angular2-material/card';
import { AboutComponent } from './about.component';
import {AboutRoutingModule} from "./about-routing.module";


@NgModule({
    imports: [CommonModule, MdCardModule, AboutRoutingModule],
    declarations: [AboutComponent],
    exports: [AboutComponent]
})
export class AboutModule { }
