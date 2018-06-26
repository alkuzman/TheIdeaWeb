import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccessTokenContext} from './token/access-token-context';
import {RefreshTokenContext} from './token/refresh-token-context';
import {PrincipalContext} from './principal/principal-context';
import {RefreshAccessTokenService} from './token/refresh-access-token.service';
import {AuthenticationService} from './authentication.service';
import {JWT_OPTIONS, JwtInterceptor, JwtModule} from '@auth0/angular-jwt';
import {jwtOptionsFactory} from './token/jwt/jwt-options-factory';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RefreshTokenInterceptorService} from './token/refresh-token-interceptor.service';
import {SECURITY_CONTEXTS} from './base-security-context';

@NgModule({
  imports: [
    CommonModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [AccessTokenContext]
      }
    })
  ],
  declarations: [],
  providers: [
    {
      provide: SECURITY_CONTEXTS,
      useExisting: AccessTokenContext,
      multi: true
    },
    {
      provide: SECURITY_CONTEXTS,
      useExisting: RefreshTokenContext,
      multi: true
    },
    {
      provide: SECURITY_CONTEXTS,
      useExisting: PrincipalContext,
      multi: true
    },
    RefreshAccessTokenService, AuthenticationService,
    JwtInterceptor, // Providing JwtInterceptor allow to inject JwtInterceptor manually into RefreshTokenInterceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptorService,
      multi: true
    }
  ]
})
export class AuthenticationModule {
}
