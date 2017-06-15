/**
 * Created by AKuzmanoski on 19/01/2017.
 */
import {Component, OnInit, ViewChild, Output, EventEmitter, HostBinding, ViewEncapsulation} from "@angular/core";
@Component({
  moduleId: module.id,
  selector: "ideal-search",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "search.component.html"
})
export class SearchComponent implements OnInit {
  value: string = "";
  @ViewChild("search") search: any;
  @Output("searchSubmit") searchSubmit: EventEmitter<string> = new EventEmitter<string>();

  @HostBinding("style.display") get display() {
    return "block";
  }

  ngOnInit() {
    this.search.nativeElement.focus();
  }

  submit(): void {
    this.searchSubmit.emit(this.value);
  }

  clear(): void {
    this.value = "";
    this.search.nativeElement.focus();
  }
}
