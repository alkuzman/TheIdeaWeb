import {AfterViewInit, Directive, ElementRef, Input, OnInit} from '@angular/core';
import {AnimationBuilder, useAnimation} from "@angular/animations";
import {fadeSlideFromBottom} from "../../../core/animations/fade-slide-animations";

@Directive({
  selector: 'idealStagger, [idealStagger]'
})
export class StaggerDirective implements OnInit, AfterViewInit {
  @Input("idealStagger") idealStagger: number = 0;

  constructor(private _builder: AnimationBuilder, private element: ElementRef) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.animate();
  }

  animate(): void {
    const loaderAnimation = this._builder.build(useAnimation(fadeSlideFromBottom, {params: {delay: ((this.idealStagger % 10) * 40) + "ms", translate: "20px"}}));
    loaderAnimation.create(this.element.nativeElement, {}).play();
  }
}
