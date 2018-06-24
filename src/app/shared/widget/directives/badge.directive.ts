import {Directive, ElementRef, HostBinding, Input, Renderer2} from '@angular/core';

/**
 * Created by AKuzmanoski on 02/03/2017.
 */
@Directive({
  selector: '[ideal-badge]'
})
export class IdealBadgeDirective {
  @HostBinding('class.ideal-badge') idealBadge = true;

  private _position: string;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
  }

  @Input()
  get position(): string {
    return this._position;
  }

  set position(value: string) {
    this._updatePosition(value);
  }

  _updatePosition(position: string) {
    this._setElementPosition(this._position, false);
    this._setElementPosition(position, true);
    this._position = position;
  }

  _getHostElement() {
    return this._elementRef.nativeElement;
  }

  _setElementPosition(position: string, isAdd: boolean) {
    if (position != null && position !== '') {
      if (isAdd) {
        this._renderer.addClass(this._getHostElement(), `ideal-badge-${position}`);
      } else {
        this._renderer.removeChild(this._getHostElement(), `ideal-badge-${position}`);
      }
    }
  }
}
