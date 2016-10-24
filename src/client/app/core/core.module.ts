import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import {} from "../pages/home/home.module";

import {CoreComponent} from "./core.component"
import {HomeModule} from "../pages/home/home.module";
import {AboutModule} from "../pages/about/about.module"
import {IdeaModule} from "./idea/idea.module";
import {ProblemModule} from "./problem/problem.module";


@NgModule({
    imports: [SharedModule.forRoot(), IdeaModule, ProblemModule],
    declarations: [CoreComponent],
    exports: [CoreComponent],
})
export class CoreModule { }


