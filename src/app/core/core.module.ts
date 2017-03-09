import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {JwtAuthenticationService} from "./authentication/jwt/jwt-authentication.service";
import {JwtHttpService} from "./authentication/jwt/jwt-http.service";
import {JwtSecurityContext} from "./authentication/jwt/jwt-security-context.service";
import {JwtRefreshAccessTokenService} from "./authentication/jwt/jwt-refresh-access-token.service";
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
import {KeysService} from "./security-protocols/keys/keys.service";
import {CertificateRequestGenerationService} from "./security-protocols/certificates/certificates-requests-generation.service";
import {CryptographicOperations} from "./security-protocols/cryptographic-operations/cryptographic-operations";
import {IconRegistryService} from "./icon-registry/icon-registry.service";
import {SecurityProfileConstructorService} from "./security-protocols/constructors/security-profile-constructor.service";
import {ProtocolMessagesBuilderService} from "./security-protocols/constructors/protocol-messages-builder.service";
import {HelperService} from "./security-protocols/helper.service";
import {ParserPemService} from "./security-protocols/parsers/parser-pem.service";
import {SecurityProfileService} from "../domain/services/security-profile/security-profile.service";


@NgModule({
  imports: [SharedModule],
  declarations: [],
  exports: [],
  providers: [IconRegistryService, JwtSecurityContext, JwtAuthenticationService, JwtRefreshAccessTokenService, ThemingService,
    NavigationService, RedirectService, NotAuthenticatedGuard, ConfigService, AuthenticatedGuard, LoadingService,
    JwtHttpService, ErrorHandlingService, PasswordStrengthService, AnalyzerService, ScrollService, STOMPService,
    SocketService, KeysService, CertificateRequestGenerationService, SecurityProfileConstructorService,
    CryptographicOperations, SecurityProfileConstructorService, ProtocolMessagesBuilderService,
    HelperService, ParserPemService, SecurityProfileService]
})
export class CoreModule {
}


