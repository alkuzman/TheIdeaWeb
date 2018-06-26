import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {LocalStore} from './local-store';

@Injectable({
  providedIn: 'root',
  useClass: LocalStore
})
export abstract class PersistentStore {
  abstract store<T>(key: string, object: T): void;

  abstract get<T>(key: string): Observable<T>;

  abstract remove(key: string): void;
}
