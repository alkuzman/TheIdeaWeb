import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ideal-doc-text-figure-layout, [ideal-doc-text-figure-layout]',
  templateUrl: "doc-text-figure-layout.component.html",
  styles: [".ideal-doc-text-figure-layout {display: block;}"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.ideal-doc-text-figure-layout]": "true"
  }
})
export class DocTextFigureLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
