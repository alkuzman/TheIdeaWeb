import {EventEmitter, Injectable} from "@angular/core";
import {LoadingState} from "./loading-state";
import {Observable} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
/**
 * Created by AKuzmanoski on 14/01/2017.
 */
@Injectable()
export class LoadingService {
  private _loadingState: LoadingState;
  private _loadingStateChange: EventEmitter<LoadingState> = new EventEmitter<LoadingState>();
  private numOfLoadings: number = 0;
  private indefiniteLoading: LoadingState = new LoadingState();

  private set loadingState(loadingState: LoadingState) {
    this._loadingState = loadingState;
    if (loadingState == null)
      this._loadingStateChange.emit(this._loadingState);
    else {
      let timer = TimerObservable.create(100, 100);
      let subscription = timer.subscribe(t => {
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
    if (this.numOfLoadings === 0)
      this.loadingState = null;
  }

  public get loadingStateChange(): Observable<LoadingState> {
    return this._loadingStateChange.asObservable().delay(10);
  }
}
