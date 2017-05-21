import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ideal-doc-section',
  templateUrl: './doc-section.component.html',
  styleUrls: ['./doc-section.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.ideal-doc-section]": "true"
  }
})
export class DocSectionComponent implements OnInit {
  @Input("id") id: string;
  @Input("title") title: string;

  constructor() { }

  ngOnInit() {
  }

}
