import {Renderer, ElementRef, Directive, Input, OnInit} from "@angular/core";
/**
 * Created by AKuzmanoski on 27/12/2016.
 */
@Directive({
  selector: '[idealColor]'
})
/** Highlight the attached element in gold */
export class ColorDirective implements OnInit {
  @Input("idealColor") color: string;

  constructor(private renderer: Renderer, private el: ElementRef) {
  }

  ngOnInit() {
    this.renderer.setElementClass(this.el.nativeElement, this.color != null ? this.color : 'accent', true);
  }
}
