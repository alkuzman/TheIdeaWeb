import {InjectionToken} from '@angular/core';

export interface BaseSecurityContext {
  clear(): void;

  setContext(data: any): void;
}

export const SECURITY_CONTEXTS: InjectionToken<BaseSecurityContext[]> = new InjectionToken<BaseSecurityContext[]>('security.contexts');
