import {PersistentStore} from './persistent-store';
import {Observable, of} from 'rxjs';

export class LocalStore implements PersistentStore {
  get<T>(key: string): Observable<T> {
    const data = localStorage.getItem(key);
    let object;
    try {
      object = JSON.parse(data);
    } catch (e) {
      if (data === 'undefined') {
        object = undefined;
      } else {
        object = data;
      }
    }
    return of(object);
  }

  store<T>(key: string, object: T): void {
    let data;
    try {
      data = JSON.stringify(object);
    } catch (e) {
      data = object;
    }

    localStorage.setItem(key, data);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
