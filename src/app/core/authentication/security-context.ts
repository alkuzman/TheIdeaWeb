import {Observable} from 'rxjs/index';

export interface SecurityContext<T> {
  set(data: T): void

  get(): T;

  getObservable(): Observable<T>;

  clear(): void;
}
