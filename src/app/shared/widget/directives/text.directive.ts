import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[ideal-text]',
})
export class TextDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.display = "block";
    el.nativeElement.style.minWidth = "240px";
    el.nativeElement.style.maxWidth = "360px";
    el.nativeElement.style.justifyContent = "center";
  }
}
