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
import {LoadingService} from "./loading/loading.service";
import {AnalyzerService} from "./analyzers/analyzer.service";
import {ScrollService} from "./scrolling/scroll-service";
import {RedirectService} from "./navigation/redirect.service";
import {ConfigService} from "./config/config.service";
import {STOMPService} from "./socket/stopm.service";
import {SocketService} from "./socket/socket.service";
import {AuthHttp} from "angular2-jwt";


@NgModule({
  imports: [SharedModule],
  declarations: [],
  exports: [],
  providers: [JwtSecurityContext, JwtAuthenticationService, JwtRefreshAccessTokenService, ThemingService, NavigationService, RedirectService,
    NotAuthenticatedGuard, ConfigService, AuthenticatedGuard, LoadingService, JwtHttpService, ErrorHandlingService, PasswordStrengthService, AnalyzerService, ScrollService, STOMPService, SocketService]
})
export class CoreModule {
}


