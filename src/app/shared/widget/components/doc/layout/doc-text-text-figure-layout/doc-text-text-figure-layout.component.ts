import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ideal-doc-text-text-figure-layout, [ideal-doc-text-text-figure-layout]',
  templateUrl: "doc-text-text-figure-layout.component.html",
  styles: [".ideal-doc-text-text-figure-layout {display: block;}"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.ideal-doc-text-text-figure-layout]": "true"
  }
})
export class DocTextTextFigureLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
