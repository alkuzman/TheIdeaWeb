import {NgModule, EventEmitter} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {APP_BASE_HREF} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {routes} from "./app.routes";
import {MainNavModule} from "./main-nav/main-nav.module";
import {SharedModule} from "./shared/shared.module";
import {Logger} from "./logger.service";

@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes), MainNavModule, SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [Logger,
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    }],
  bootstrap: [AppComponent]

})

export class AppModule {
}
