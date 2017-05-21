import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ideal-figure, [ideal-figure]',
  template: `
    <ng-content></ng-content>
  `,
  styles: [".ideal-figure {display: block;}"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.ideal-figure]": "true"
  }
})
export class FigureComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
