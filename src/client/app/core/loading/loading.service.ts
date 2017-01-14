import {OnInit, EventEmitter, Injectable} from "@angular/core";
import {LoadingState} from "./loading-state";
import {Observable} from "rxjs";
/**
 * Created by AKuzmanoski on 14/01/2017.
 */
@Injectable()
export class LoadingService{
  private _loadingState: LoadingState;
  private _loadingStateChange: EventEmitter<LoadingState> = new EventEmitter<LoadingState>();
  private numOfLoadings: number = 0;
  private indefiniteLoading: LoadingState = new LoadingState();

  private set loadingState(loadingState: LoadingState) {
    this._loadingState = loadingState;
    this._loadingStateChange.emit(this._loadingState);
  }

  public load(loadingState: LoadingState = this.indefiniteLoading) {
    this.loadingState = loadingState;
    this.numOfLoadings++;
  }


  public loadingDone() {
    this.numOfLoadings--;
    if (this.numOfLoadings === 0)
      this.loadingState = undefined;
  }

  public get loadingStateChange(): EventEmitter<LoadingState> {
    return this._loadingStateChange;
  }
}
