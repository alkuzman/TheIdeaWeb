/**
 * Created by AKuzmanoski on 19/02/2017.
 */
import {Directive, OnInit, HostListener, Output, EventEmitter, Input} from "@angular/core";
@Directive({
  selector: '[ideal-input-idle], [idealInputIdle]',
  exportAs: 'idealInputIdle'
})
export class IdealInputIdle {
  private lastInput: Date;
  @Input() delay: number = 3000;
  @Output("idle") idle: EventEmitter<number> = new EventEmitter<number>();

  @HostListener("input", ['$event'])
  setIdleTimeout(event: Event): void {
    this.lastInput = new Date();
    setTimeout(() => {
      let now = new Date();
      let difference = now.getTime() - this.lastInput.getTime();
      if (difference >= this.delay)
        this.idle.emit(difference);
    }, this.delay);
  }
}
