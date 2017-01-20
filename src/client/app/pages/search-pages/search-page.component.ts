/**
 * Created by AKuzmanoski on 20/01/2017.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
@Component({
  moduleId: module.id,
  selector: "ideal-search-page",
  templateUrl: "search-page.component.html"
})
export class SearchPageComponent implements OnInit{
  private pageSize: number;
  private query: string;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data: {pageSize: number}) => {
      this.pageSize = data.pageSize;
    });
    this.route.queryParams.subscribe((data: {query: string}) => {
      this.query = data.query;
    });
  }
}
