/**
 * Created by AKuzmanoski on 19/01/2017.
 */
import {Component, OnInit, ViewChild, Output, EventEmitter} from "@angular/core";
@Component({
  moduleId: module.id,
  selector: "ideal-search",
  templateUrl: "search.component.html"
})
export class SearchComponent implements OnInit {
  private value: string = "";
  @ViewChild("search") search: any;
  @Output("searchSubmit") searchSubmit: EventEmitter<string> = new EventEmitter<string>();

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
