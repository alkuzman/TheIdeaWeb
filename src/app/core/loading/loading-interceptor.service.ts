import {EventEmitter} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {LoadingState} from './loading-state';
import {delay} from 'rxjs/operators';

// TODO provide this service when the HttpClient will be included
export class LoadingInterceptorService implements HttpInterceptor {
  private _loadingState: LoadingState;
  private _loadingStateChange: EventEmitter<LoadingState> = new EventEmitter<LoadingState>(true);

  private numOfLoadings = 0;

  private indefiniteLoading: LoadingState = new LoadingState();

  constructor() {
  }

  public get loadingStateChange(): Observable<LoadingState> {
    return this._loadingStateChange.asObservable().pipe(delay(10));
  }

  private set loadingState(loadingState: LoadingState) {
    this._loadingState = loadingState;
    if (loadingState == null) {
      this._loadingStateChange.emit(this._loadingState);
    } else {
      const timer = TimerObservable.create(100, 100);
      const subscription = timer.subscribe(t => {
        if (this._loadingState != null) {
          this._loadingStateChange.emit(this._loadingState);
          subscription.unsubscribe();
        }
      });
    }
  }

  public load(loadingState: LoadingState = this.indefiniteLoading) {
    console.log(this.loadingState);
    this.loadingState = loadingState;
    this.numOfLoadings++;
  }

  public loadingDone(): void {
    this.numOfLoadings--;
    if (this.numOfLoadings === 0) {
      this.loadingState = null;
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.load();
    const result = next.handle(req);
    this.loadingDone();
    return result;
  }
}
