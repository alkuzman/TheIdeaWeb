import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[idealBackgroundColor]'
})
export class BackgroundColorDirective implements OnInit {
  @Input("idealBackgroundColorApply") idealBackgroundColorApply = true;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    console.log("background-color.directive");
    this.renderer.addClass(this.el.nativeElement, this.idealBackgroundColorApply ? '' : 'app-colored');
  }
}
