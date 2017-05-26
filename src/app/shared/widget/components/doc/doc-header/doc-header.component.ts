import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ideal-doc-header, [ideal-doc-header]',
  template: `
    <ng-content select="ideal-doc-title, [ideal-doc-title]"></ng-content>
    <ng-content select="ideal-doc-subtitle, [ideal-doc-subtitle]"></ng-content>
    <ng-content select="ideal-doc-text-text-figure-layout, [ideal-doc-text-text-figure-layout]"></ng-content>
  `,
  styles: [".ideal-doc-header {display: block;}"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.ideal-doc-header]": "true"
  }
})
export class DocHeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
