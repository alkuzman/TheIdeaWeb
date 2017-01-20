import {Component, Input} from "@angular/core";
import {Searchable} from "../../../model/sharing/searchable";
/**
 * Created by AKuzmanoski on 20/01/2017.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-searchable-list",
  templateUrl: "searchable-list.component.html"
})
export class SearchableListComponent {
  @Input("searchableList") searchableList: Searchable[];
}
