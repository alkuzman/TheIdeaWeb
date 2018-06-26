import {BehaviorSubject, Observable} from 'rxjs';
import {PersistentStore} from '../store/persistent-store';
import {BaseSecurityContext} from './base-security-context';
import {SecurityContext} from './security-context';

export abstract class AbstractSecurityContext<T> implements BaseSecurityContext, SecurityContext<T> {
  private subject: BehaviorSubject<T> = new BehaviorSubject<T>(null);

  public constructor(private persistentStore: PersistentStore) {
    this.init();
  }

  public clear(): void {
    this.persistentStore.remove(this.getKey());
    this.subject.next(null);
  }

  public setContext(data: any): void {
    const value: T = this.extractContext(data);
    this.set(value);
  }

  public set(data: T): void {
    this.persistentStore.store<T>(this.getKey(), data);
    this.subject.next(data);
  }

  public get(): T {
    return this.subject.getValue();
  }

  public getObservable(): Observable<T> {
    return this.subject.asObservable();
  }

  abstract extractContext(data: any): T;

  abstract getKey(): string;

  private init() {
    this.getStored().subscribe(data => {
      if (data !== null) {
        this.subject.next(data);
      }
    });
  }

  private getStored(): Observable<T> {
    return this.persistentStore.get<T>(this.getKey());
  }
}
