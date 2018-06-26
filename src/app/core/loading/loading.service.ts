import {delay} from 'rxjs/operators';
import {EventEmitter, Injectable} from '@angular/core';
import {LoadingState} from './loading-state';
import {Observable, of} from 'rxjs';

/**
 * Created by AKuzmanoski on 14/01/2017.
 */
@Injectable()
export class LoadingService {
  private numOfLoadings = 0;
  private indefiniteLoading: LoadingState = new LoadingState();

  private _loadingStateChange: EventEmitter<LoadingState> = new EventEmitter<LoadingState>(true);

  private _loadingState: LoadingState;

  public constructor() {

  }

  public get loadingStateChange(): Observable<LoadingState> {
    return this._loadingStateChange.asObservable().pipe(delay(10));
  }

  private set loadingState(loadingState: LoadingState) {
    this._loadingState = loadingState;
    if (loadingState == null) {
      this._loadingStateChange.emit(this._loadingState);
    } else {
      const timer = of(1).pipe(delay(25));
      const subscription = timer.subscribe(() => {
        if (this._loadingState != null) {
          this._loadingStateChange.emit(this._loadingState);
          subscription.unsubscribe();
        }
      });
    }
  }

  public load(loadingState: LoadingState = this.indefiniteLoading) {
    this.loadingState = loadingState;
    this.numOfLoadings++;
  }

  public loadingDone(): void {
    this.numOfLoadings--;
    if (this.numOfLoadings === 0) {
      this.loadingState = null;
    }
  }
}
