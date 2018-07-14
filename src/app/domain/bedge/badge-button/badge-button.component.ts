/**
 * Created by AKuzmanoski on 08/03/2017.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Badge} from '../../model/awards/badges/badge';
import {BadgeIconResolverService} from '../badge-icon-resolver.service';

@Component({
  moduleId: module.id,
  selector: 'ideal-badge-button',
  templateUrl: 'badge-button.component.html'
})
export class BadgeButtonComponent {
  @Input('badge') badge: Badge<any, any>;
  _buttonSize: number;
  @Input('namesAsTooltips') namesAsTooltips: boolean;
  @Input('maxWidth') maxWidth: number;
  @Input('color') color: string;
  @Output('selected') selected: EventEmitter<void> = new EventEmitter<void>();

  _iconSize: number;

  constructor(private badgeIconResolver: BadgeIconResolverService) {

  }

  @Input('iconSize') set iconSize(iconSize: number) {
    this._iconSize = iconSize;
    this._buttonSize = iconSize + 18;
  }

  getIconName(badge: Badge<any, any>): string {
    return this.badgeIconResolver.resolveIcon(badge);
  }

  clicked(): void {
    this.selected.emit();
  }
}
