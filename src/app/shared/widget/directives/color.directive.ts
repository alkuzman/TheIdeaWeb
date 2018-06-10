import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

/**
 * Created by AKuzmanoski on 27/12/2016.
 */
@Directive({
  selector: '[idealColor]'
})
/** Highlight the attached element in gold */
export class ColorDirective implements OnInit {
  @Input('idealColor') idealColor: string;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, this.idealColor != null ? this.idealColor : 'accent');
  }
}
