import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ideal-short-text',
  template: `
    <div class="ideal-body-1">
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.ideal-short-text]": "true"
  }
})
export class ShortTextComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
