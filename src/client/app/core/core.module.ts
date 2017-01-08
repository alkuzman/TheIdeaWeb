import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {JwtAuthenticationService} from "./authentication/jwt/jwt-authentication.service";
import {JwtHttpService} from "./authentication/jwt/jwt-http.service";
import {JwtSecurityContext} from "./authentication/jwt/jwt-security-context.service";
import {JwtRefreshAccessTokenService} from "./authentication/jwt/jwt-refresh-access-token.service";
import {XHRBackend, RequestOptions} from "@angular/http";
import {NotAuthenticatedGuard} from "./guards/not-authenticated.guard";
import {AuthenticatedGuard} from "./guards/authenticated.guard";
import {ThemingService} from "./theming/theming.service";
import {NavigationService} from "./navigation/navigation.service";
import {ErrorHandlingService} from "./error-handling/error-handling.service";
import {PasswordStrengthService} from "./helper/services/password-strength.service";


@NgModule({
  imports: [SharedModule],
  declarations: [],
  exports: [],
  providers: [JwtSecurityContext, JwtAuthenticationService, JwtRefreshAccessTokenService, ThemingService, NavigationService,
    {
      provide: JwtHttpService,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, context: JwtSecurityContext, jwtRefreshAccessTokenService: JwtRefreshAccessTokenService) => {
        return new JwtHttpService(backend, defaultOptions, context, jwtRefreshAccessTokenService);
      },
      deps: [XHRBackend, RequestOptions, JwtSecurityContext, JwtRefreshAccessTokenService]
    },
    NotAuthenticatedGuard, AuthenticatedGuard, ErrorHandlingService, PasswordStrengthService]
})
export class CoreModule {
}


