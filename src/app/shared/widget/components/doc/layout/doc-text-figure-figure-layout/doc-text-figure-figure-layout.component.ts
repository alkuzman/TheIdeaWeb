import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ideal-doc-text-figure-figure-layout, [ideal-doc-text-figure-figure-layout]',
  templateUrl: "doc-text-figure-figure-layout.component.html",
  styles: [".ideal-doc-text-figure-figure-layout {display: block;}"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.ideal-doc-text-figure-figure-layout]": "true"
  }
})
export class DocTextFigureFigureLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
