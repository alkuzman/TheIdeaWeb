import {
  AfterContentChecked, ChangeDetectionStrategy, Component, ContentChildren, OnInit, QueryList,
  ViewEncapsulation
} from '@angular/core';
import {Content} from "./doc-table-contents/content";
import {DocSectionComponent} from "./doc-section/doc-section.component";

@Component({
  selector: 'ideal-doc-content, [ideal-doc-content]',
  templateUrl: "doc-content.component.html",
  styles: [".ideal-doc-content {display: block}"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.ideal-doc-content]": "true"
  }
})
export class DocContentComponent implements OnInit, AfterContentChecked  {
  contents: Content[];
  @ContentChildren(DocSectionComponent) sections: QueryList<DocSectionComponent>;

  constructor() { }

  ngOnInit() {
    this.contents = [{
      name: "Security",
      fragment: "/about#ideal-security"
    },
      {
        name: "Analyzers",
        fragment: "/about#ideal-analyzers"
      }];
  }

  ngAfterContentChecked() {
    this.setupContents();
  }

  setupContents() {
    this.contents = [];
    this.sections.forEach((section: DocSectionComponent, index) => {
      this.contents.push({fragment: section.id, name: section.title})
    });
  }
}
