/**
 * Created by AKuzmanoski on 02/03/2017.
 */
import {
  Component, ElementRef, Renderer, Input, Directive, NgModule, ViewEncapsulation,
  ChangeDetectionStrategy
} from "@angular/core";
import {MaterialModule} from "@angular/material";
import {CommonModule} from "@angular/common";

@Directive({
  selector: 'label[ideal-label]',
  host: {
    '[class.ideal-label]': 'true'
  }
})
export class IdealLabelStyle {}

@Directive({
  selector: 'label[ideal-circle-label]',
  host: {
    '[class.ideal-circle-label]': 'true'
  }
})
export class IdealCircleLabelStyle {}

@Directive({
  selector: 'label[ideal-raised-label]',
  host: {
    '[class.ideal-raised-label]': 'true'
  }
})
export class IdealRaisedLabelStyle {}


@Component({
  moduleId: module.id,
  selector: "label[ideal-label], label[ideal-circle-label], label[ideal-raised-label]",
  templateUrl: "label.component.html",
  styleUrls: ['label.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdealLabel {
  private _color: string;

  @Input() text: string;

  /** The color of the button. Can be `primary`, `accent`, or `warn`. */
  @Input()
  get color(): string { return this._color; }
  set color(value: string) {
    this._updateColor(value);
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer) { }

  _getHostElement() {
    return this._elementRef.nativeElement;
  }

  _updateColor(newColor: string) {
    this._setElementColor(this._color, false);
    this._setElementColor(newColor, true);
    this._color = newColor;
  }

  _setElementColor(color: string, isAdd: boolean) {
    if (color != null && color != '') {
      this._renderer.setElementClass(this._getHostElement(), `ideal-${color}`, isAdd);
    }
  }
}

@NgModule({
  imports: [CommonModule, MaterialModule],
  exports: [
    IdealLabel, IdealLabelStyle, IdealCircleLabelStyle, IdealRaisedLabelStyle
  ],
  declarations: [
    IdealLabel, IdealLabelStyle, IdealCircleLabelStyle, IdealRaisedLabelStyle
  ],
})
export class IdealLabelModule {

}
