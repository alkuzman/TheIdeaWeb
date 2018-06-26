import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {NotAuthenticatedGuard} from './guards/not-authenticated.guard';
import {AuthenticatedGuard} from './guards/authenticated.guard';
import {ThemingService} from './theming/theming.service';
import {NavigationService} from './navigation/navigation.service';
import {ErrorHandlingService} from './error-handling/error-handling.service';
import {PasswordStrengthService} from './helper/services/password-strength.service';
import {LoadingService} from './loading/loading.service';
import {ScrollService} from './scrolling/scroll-service';
import {RedirectService} from './navigation/redirect.service';
import {ConfigService} from './config/config.service';
import {STOMPService} from './socket/stopm.service';
import {SocketService} from './socket/socket.service';
import {KeysService} from './security-protocols/keys/keys.service';
import {UserCertificationService} from './security-protocols/certificates/user-certification.service';
import {CryptographicOperations} from './security-protocols/cryptographic-operations/cryptographic-operations';
import {IconRegistryService} from './icon-registry/icon-registry.service';
import {SecurityProfileConstructorService} from './security-protocols/constructors/security-profile-constructor.service';
import {ProtocolMessagesBuilderService} from './security-protocols/constructors/protocol-messages-builder.service';
import {HelperService} from './security-protocols/helper.service';
import {ParserPemService} from './security-protocols/parsers/parser-pem.service';
import {ProtocolMessagesReconstructionService} from './security-protocols/constructors/protocol-messages-reconstruction.service';
import {SecurityModule} from '../domain/security/security.module';
import {
  ProtocolTransactionStepNoticeConstructor
} from './security-protocols/constructors/protocol-transaction-step-notice-constructor.service';
import {EncryptingService} from './security-protocols/encrypting.service';
import {DecryptingService} from './security-protocols/decrypting.service';
import {SecurityProfileService} from '../domain/services/security-profile/security-profile.service';
import {SimpleCryptographicOperations} from './security-protocols/cryptographic-operations/simple-cryptographic-operations';
import {AlgorithmService} from './security-protocols/algorithms/algorithms.service';
import {AccessFromUrlNotAllowedGuard} from './guards/access-from-url-not-allowed.guard';
import {DiscardChangesGuard} from './guards/discard_changes.guard';
import {MyTesterService} from './security-protocols/my-tester.service';
import {CertificateOperationsService} from './security-protocols/certificates/certificate-operations.service';
import {AnalyzerModule} from './analyzers/analyzer.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoadingInterceptorService} from './loading/loading-interceptor.service';
import {AuthenticationModule} from './authentication/authentication.module';
import {SecurityProfileContext} from '../domain/security/security-profile-context/security-profile-context';
import {SECURITY_CONTEXTS} from './authentication/base-security-context';


@NgModule({
  imports: [SharedModule, AuthenticationModule, SecurityModule, AnalyzerModule],
  declarations: [],
  exports: [],
  providers: [IconRegistryService, ThemingService,
    NavigationService, RedirectService, NotAuthenticatedGuard, ConfigService, AuthenticatedGuard, LoadingService,
    ErrorHandlingService, PasswordStrengthService, ScrollService, STOMPService,
    SocketService, KeysService, UserCertificationService, SecurityProfileConstructorService,
    SimpleCryptographicOperations, CryptographicOperations, SecurityProfileConstructorService,
    ProtocolMessagesBuilderService, HelperService, ParserPemService, SecurityProfileService,
    ProtocolMessagesReconstructionService, HelperService, ParserPemService, EncryptingService,
    DecryptingService, ProtocolTransactionStepNoticeConstructor, AlgorithmService, DiscardChangesGuard,
    AccessFromUrlNotAllowedGuard, MyTesterService, CertificateOperationsService,
    {
      provide: SECURITY_CONTEXTS,
      useExisting: SecurityProfileContext,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    }]
})
export class CoreModule {
}


