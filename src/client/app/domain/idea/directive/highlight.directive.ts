/**
 * Created by AKuzmanoski on 11/10/2016.
 */
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({ selector: '[color]'})
/** Highlight the attached element in gold */
export class HighlightDirective {
  constructor(renderer: Renderer, el: ElementRef) {
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gold');
  }
}
