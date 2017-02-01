/**
 * Created by AKuzmanoski on 17/01/2017.
 */
import {Injectable, EventEmitter} from "@angular/core";
@Injectable()
export class ScrollService {
  public scrollEvent: EventEmitter<void> = new EventEmitter<void>();

  onScroll() {
    this.scrollEvent.emit();
  }
}
