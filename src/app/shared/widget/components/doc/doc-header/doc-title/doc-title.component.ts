import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ideal-doc-title, [ideal-doc-title]',
  template: `
    <h1 idealColor="primary" class="ideal-display-1"><ng-content></ng-content></h1>
  `,
  styles: [".ideal-doc-title h1 {margin-top: 0px !important;}", ".ideal-doc-title {display: block;}"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.ideal-doc-title]": "true"
  }
})
export class DocTitleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
