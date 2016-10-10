import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './main-nav.routes';

import { SharedModule } from '../shared/shared.module';

import {} from "../home/home.module";

import {MainNavComponent} from "./main-nav.component"
import {HomeModule} from "../home/home.module";
import {AboutModule} from "../about/about.module"


@NgModule({
    imports: [ RouterModule.forRoot(routes), SharedModule.forRoot(), HomeModule, AboutModule],
    declarations: [MainNavComponent],
    exports: [MainNavComponent],
})
export class MainNavModule { }


