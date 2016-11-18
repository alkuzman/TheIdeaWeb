import {NgModule} from "@angular/core";
import {HttpModule, XHRBackend, RequestOptions} from "@angular/http";
import {JwtHttpService} from "./jwt-http.service";
/**
 * Created by Viki on 11/17/2016.
 */


@NgModule({
  imports: [HttpModule],
  providers: [
    {
      provide: JwtHttpService,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new JwtHttpService(backend, defaultOptions);
      },
      deps: [XHRBackend, RequestOptions]
    }
  ]
})
export class HttpWraperModule {
}
