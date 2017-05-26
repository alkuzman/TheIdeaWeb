import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ideal-doc-subtitle, [ideal-doc-subtitle]',
  template: `
    <h1 class="ideal-title"><ng-content></ng-content></h1>
  `,
  styles: [".ideal-doc-subtitle h1 {font-weight: normal !important;}", ".ideal-doc-subtitle {display: block;}"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.ideal-doc-subtitle]": "true"
  }
})
export class DocSubtitleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
