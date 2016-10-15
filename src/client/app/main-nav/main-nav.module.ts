import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import {} from "../home/home.module";

import {MainNavComponent} from "./main-nav.component"
import {HomeModule} from "../home/home.module";
import {AboutModule} from "../about/about.module"
import {IdeaModule} from "../idea/idea.module";
import {MainNavRoutingModule} from "./main-nav-routing.module";


@NgModule({
    imports: [SharedModule.forRoot(), HomeModule, AboutModule, IdeaModule],
    declarations: [MainNavComponent],
    exports: [MainNavComponent],
})
export class MainNavModule { }


