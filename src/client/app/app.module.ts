import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {APP_BASE_HREF} from "@angular/common";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {MainNavModule} from "./main-nav/main-nav.module";
import {SharedModule} from "./shared/shared.module";
import {Logger} from "./logger.service";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule, MainNavModule, SharedModule.forRoot()],
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
