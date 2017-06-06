import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[ideal-short-text]'
})
export class ShortTextDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.display = "block";
    el.nativeElement.style.minWidth = "240px";
    el.nativeElement.style.maxWidth = "360px";
    el.nativeElement.style.justifyContent = "center";
  }
}
