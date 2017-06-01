import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {APP_BASE_HREF} from "@angular/common";
import {Http, HttpModule, RequestOptions} from "@angular/http";
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared/shared.module";
import {Logger} from "./logger.service";
import {AppRoutingModule} from "./app-routing.module";
import {CoreModule} from "./core/core.module";
import {PagesModule} from "./pages/pages.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DomainServicesModule} from "./domain/services/domain-services.module";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FroalaEditorModule, FroalaViewModule} from "angular2-froala-wysiwyg";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'auth_token',
    headerName: "X-Authorization",
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
  imports: [BrowserModule, HttpModule, BrowserAnimationsModule, FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(), CoreModule, BrowserAnimationsModule, FlexLayoutModule, SharedModule.forRoot(), DomainServicesModule, PagesModule, AppRoutingModule],
  declarations: [AppComponent],
  providers: [{
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }, Logger,
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }],
  bootstrap: [AppComponent]

})
export class AppModule {
}
