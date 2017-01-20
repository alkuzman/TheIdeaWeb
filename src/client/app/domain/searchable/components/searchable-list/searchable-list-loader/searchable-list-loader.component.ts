/**
 * Created by AKuzmanoski on 20/01/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {SearchableService} from "../../../../services/searchable/searchable.searvice";
import {Searchable} from "../../../../model/sharing/searchable";
import {ScrollService} from "../../../../../core/scrolling/scroll-service";
@Component({
  moduleId: module.id,
  selector: "ideal-searchable-list-loader",
  template: `<ideal-searchable-list [searchableList]="results"></ideal-searchable-list>`
})
export class SearchableListLoaderComponent implements OnInit {
  @Input("pageSize") pageSize: number;
  private _query: string;
  private page: number = 0;
  private results: Searchable[];
  private noMoreResults: boolean = false;

  @Input("query") set query(query: string) {
    let reload: boolean = this._query != null;
    this._query = query;
    if (reload)
      this.loadData();
  }

  constructor(private searchableService: SearchableService, private scrollService: ScrollService) {

  }

  ngOnInit(): void {
    this.loadData();
    this.scrollService.scrollEvent.subscribe(() => {
      this.loadMore();
    });
  }

  loadData(): void {
    this.page = 0;
    this.noMoreResults = false;
    let offset: number = this.page * this.pageSize;
    this.searchableService.getResults({query: this._query, offset: offset.toString(), limit: this.pageSize.toString()})
      .subscribe((results: Searchable[]) => {
        this.page++;
        this.results = results;
        if (this.results.length < this.pageSize)
          this.noMoreResults = true;
      });
  }

  loadMore(): void {
    if (this.noMoreResults)
      return;
    let offset: number = this.page * this.pageSize;
    this.searchableService.getResults({query: this._query, offset: offset.toString(), limit: this.pageSize.toString()})
      .subscribe((results: Searchable[]) => {
        this.page++;
        this.results = this.results.concat(results);
        if (results.length < this.pageSize)
          this.noMoreResults = true;
      });
  }
}
