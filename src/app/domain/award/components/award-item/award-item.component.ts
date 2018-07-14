/**
 * Created by AKuzmanoski on 26/02/2017.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Award} from '../../../model/awards/award';
import {Badge} from '../../../model/awards/badges/badge';

@Component({
  moduleId: module.id,
  selector: 'ideal-award-item',
  templateUrl: 'award-item.component.html'
})
export class AwardItemComponent {
  @Input('award') award: Award<Badge<any, any>>;
  @Input('iconSize') iconSize = 44;
  @Input('maxWidth') maxWidth = 88;
  @Input('namesAsTooltips') namesAsTooltips = false;
  @Output('awardSelected') awardSelected: EventEmitter<Award<Badge<any, any>>> = new EventEmitter<Award<Badge<any, any>>>();
  @Output('selected') selected: EventEmitter<void> = new EventEmitter<void>();

  clicked(): void {
    this.selected.emit();
  }
}
