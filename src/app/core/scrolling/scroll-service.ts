/**
 * Created by AKuzmanoski on 17/01/2017.
 */
import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class ScrollService {
  public scrollEvent: EventEmitter<void> = new EventEmitter<void>();

  onScroll() {
    this.scrollEvent.emit();
  }
}
