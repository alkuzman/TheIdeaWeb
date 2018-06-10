/**
 * Created by AKuzmanoski on 02/03/2017.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  NgModule,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../material/material.module';

@Directive({
  selector: 'label[ideal-label]'
})
export class IdealLabelStyleDirective {
  @HostBinding('class.ideal-label') idealLabelClass = true;
}

@Directive({
  selector: 'label[ideal-circle-label]'
})
export class IdealCircleLabelStyleDirective {
  @HostBinding('class.ideal-circle-label') idealCircleLabelClass = true;
}

@Directive({
  selector: 'label[ideal-raised-label]'
})
export class IdealRaisedLabelStyleDirective {
  @HostBinding('class.ideal-raised-label') idealRaisedLabelClass = true;
}


@Component({
  moduleId: module.id,
  selector: 'label[ideal-label], label[ideal-circle-label], label[ideal-raised-label]',
  templateUrl: 'label.component.html',
  styleUrls: ['label.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdealLabelComponent {
  private _color: string;

  /** The idealColor of the button. Can be `primary`, `accent`, or `warn`. */
  @Input()
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._updateColor(value);
  }
  @Input() text: string;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
  }

  _getHostElement() {
    return this._elementRef.nativeElement;
  }

  _updateColor(newColor: string) {
    this._setElementColor(this._color, false);
    this._setElementColor(newColor, true);
    this._color = newColor;
  }

  _setElementColor(color: string, isAdd: boolean) {
    if (color != null && color !== '') {
      if (isAdd) {
        this._renderer.addClass(this._getHostElement(), `ideal-${color}`);
      } else {
        this._renderer.removeClass(this._getHostElement(), `ideal-${color}`);
      }
    }
  }
}

@NgModule({
  imports: [CommonModule, MaterialModule],
  exports: [
    IdealLabelComponent, IdealLabelStyleDirective, IdealCircleLabelStyleDirective, IdealRaisedLabelStyleDirective
  ],
  declarations: [
    IdealLabelComponent, IdealLabelStyleDirective, IdealCircleLabelStyleDirective, IdealRaisedLabelStyleDirective
  ],
})
export class IdealLabelModule {

}
