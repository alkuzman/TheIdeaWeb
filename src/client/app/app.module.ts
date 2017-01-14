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
import {provideAuth} from "angular2-jwt";
import {PagesModule} from "./pages/pages.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DomainServicesModule} from "./domain/services/domain-services.module";

@NgModule({
  imports: [BrowserModule, HttpModule, MaterialModule.forRoot(), CoreModule, FlexLayoutModule.forRoot(), SharedModule.forRoot(), DomainServicesModule, PagesModule, AppRoutingModule],
  declarations: [AppComponent],
  providers: [provideAuth({
    headerName: "X-Authorization",
    tokenName: "auth_token",
    globalHeaders: [{'Content-Type': 'application/json'}]
  }), Logger,
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    }],
  bootstrap: [AppComponent]

})

export class AppModule {
}
