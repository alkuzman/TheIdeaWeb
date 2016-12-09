import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {APP_BASE_HREF} from "@angular/common";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared/shared.module";
import {Logger} from "./logger.service";
import {AppRoutingModule} from "./app-routing.module";
import {MaterialModule} from "@angular/material";
import {CoreModule} from "./core/core.module";
import {AUTH_PROVIDERS, provideAuth} from "angular2-jwt";
import {PagesModule} from "./pages/pages.module";

@NgModule({
  imports: [BrowserModule, HttpModule, MaterialModule.forRoot(), CoreModule, SharedModule.forRoot(), AppRoutingModule, PagesModule],
  declarations: [AppComponent],
  providers: [provideAuth({
    headerName: "X-Authorization",
    tokenName: "auth_token",
    globalHeaders: [{'Content-Type':'application/json'}],
    noJwtError: true,
    noTokenScheme: true
  }), Logger,
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    }],
  bootstrap: [AppComponent]

})

export class AppModule {
}
