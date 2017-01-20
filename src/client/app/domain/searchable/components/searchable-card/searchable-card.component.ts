/**
 * Created by AKuzmanoski on 20/01/2017.
 */
import {Component, Input} from "@angular/core";
import {Searchable} from "../../../model/sharing/searchable";
@Component({
  moduleId: module.id,
  selector: "ideal-searchable-card",
  templateUrl: "searchable-card.component.html"
})
export class SearchableCardComponent {
  @Input("searchable") searchable: Searchable;
}
