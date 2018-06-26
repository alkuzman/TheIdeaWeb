import {AccessTokenContext} from '../access-token-context';

export function jwtOptionsFactory(accessTokenContext: AccessTokenContext) {
  return {
    tokenGetter: () => {
      return accessTokenContext.get();
    },
    headerName: 'X-Authorization',
    skipWhenExpired: true,
    blacklistedRoutes: [
      /.*api\/auth\/.*/
    ]
  };
}
