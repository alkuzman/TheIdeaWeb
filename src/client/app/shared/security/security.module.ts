import {NgModule} from "@angular/core";
import {JwtSecurityContext} from "./jwt/jwt-security-context.service";
import {JwtRefreshAccessTokenService} from "./jwt/jwt-refresh-access-token.service";
import {JwtHttpService} from "./jwt/jwt-http.service";
import {XHRBackend, RequestOptions} from "@angular/http";
import {JwtAuthorizationService} from "./jwt/jwt-authorization.service";
/**
 * Created by Viki on 11/18/2016.
 */

@NgModule({
  declarations: [],
  providers: [JwtSecurityContext, JwtRefreshAccessTokenService, JwtAuthorizationService,
    {
      provide: JwtHttpService,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, context: JwtSecurityContext, jwtRefreshAccessTokenService: JwtRefreshAccessTokenService) => {
        return new JwtHttpService(backend, defaultOptions, context, jwtRefreshAccessTokenService);
      },
      deps: [XHRBackend, RequestOptions, JwtSecurityContext, JwtRefreshAccessTokenService]
    }],
  exports: []
})
export class SecurityModule {
}
