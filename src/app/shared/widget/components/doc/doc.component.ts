import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ideal-doc, [ideal-doc]',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.ideal-doc]": "true"
  }
})
export class DocComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
