import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ideal-text, [ideal-text]',
  template: `
    <div class="ideal-body-1">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ["text.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.ideal-text]": "true"
  }
})
export class TextComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
