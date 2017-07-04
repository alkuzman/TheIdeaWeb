import {Injectable, EventEmitter} from "@angular/core";
import {Subject} from "rxjs/Subject";
/**
 * Created by AKuzmanoski on 13/12/2016.
 */
@Injectable()
export class ThemingService {
  private _currentTheme: string;
  public themeObservable: EventEmitter<string> = new EventEmitter<string>(true);

  constructor() {
    this.currentTheme = "default-theme";
  }


  get currentTheme(): string {
    return this._currentTheme;
  }

  set currentTheme(value: string) {
    this._currentTheme = value;
    this.themeObservable.emit(this.currentTheme);
  }
}