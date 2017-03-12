import {Directive, ElementRef, Renderer, Input} from "@angular/core";
/**
 * Created by AKuzmanoski on 02/03/2017.
 */
@Directive({
  selector: '[ideal-badge]',
  host: {
    '[class.ideal-badge]': 'true'
  }
})
export class IdealBadge {
  private _position: string;

  @Input()
  get position(): string { return this._position; }
  set position(value: string) {
    console.log(value);
    this._updatePosition(value); }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer) { }

  _updatePosition(position: string) {
    this._setElementPosition(this._position, false);
    this._setElementPosition(position, true);
    this._position = position;
  }

  _getHostElement() {
    return this._elementRef.nativeElement;
  }

  _setElementPosition(position: string, isAdd: boolean) {
    if (position != null && position != '') {
      this._renderer.setElementClass(this._getHostElement(), `ideal-badge-${position}`, isAdd);
    }
  }
}
