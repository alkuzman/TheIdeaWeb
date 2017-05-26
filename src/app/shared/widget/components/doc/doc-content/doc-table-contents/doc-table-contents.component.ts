import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Content} from "./content";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

@Component({
  selector: 'ideal-doc-table-contents',
  templateUrl: './doc-table-contents.component.html',
  styleUrls: ['./doc-table-contents.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.ideal-doc-table-contents]": "true"
  }
})
export class DocTableContentsComponent implements OnInit {
  @Input("contents") contents: Content;

  constructor() {
  }

  ngOnInit() {
  }

  goTo(location: string): void {
    window.location.hash = '';
    window.location.hash = location;
  }
}
