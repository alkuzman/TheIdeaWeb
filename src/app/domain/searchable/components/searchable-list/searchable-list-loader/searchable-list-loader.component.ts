/**
 * Created by AKuzmanoski on 20/01/2017.
 */
import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {SearchableService} from "../../../../services/searchable/searchable.searvice";
import {Searchable} from "../../../../model/sharing/searchable";
import {ScrollService} from "../../../../../core/scrolling/scroll-service";
import {Announcement} from "../../../../model/sharing/announcement";
import {User} from "../../../../model/authentication/user";
import {Idea} from "../../../../model/ideas/idea";
import {Problem} from "../../../../model/ideas/problem";
import {Shareable} from "../../../../model/sharing/sharable";
@Component({
  moduleId: module.id,
  selector: "ideal-searchable-list-loader",
  templateUrl: "searchable-list-loader.component.html"
})
export class SearchableListLoaderComponent implements OnInit {
  @Input("pageSize") pageSize: number;
  _query: string;
  page: number = 0;
  results: Searchable[];
  noMoreResults: boolean = false;

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
        if (results.length < this.pageSize)
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

  @Output("announcementSelected") announcementSelected: EventEmitter<Announcement> = new EventEmitter<Announcement>();

  onAnnouncementSelected(announcement: Announcement) {
    this.announcementSelected.emit(announcement);
  }

  @Output("ideaSelected") ideaSelected: EventEmitter<Idea> = new EventEmitter<Idea>();
  @Output("ideaEdit") ideaEdit: EventEmitter<Idea> = new EventEmitter<Idea>();
  @Output("problemSelected") problemSelected: EventEmitter<Problem> = new EventEmitter<Problem>();
  @Output("userSelected") userSelected: EventEmitter<User> = new EventEmitter<User>();
  @Output("announce") announce: EventEmitter<Shareable> = new EventEmitter<Shareable>();
  @Output("ban") ban: EventEmitter<Shareable> = new EventEmitter<Shareable>();
  @Output("report") report: EventEmitter<Shareable> = new EventEmitter<Shareable>();
  @Output("remove") remove: EventEmitter<Shareable> = new EventEmitter<Shareable>();
  @Output("share") share: EventEmitter<Shareable> = new EventEmitter<Shareable>();
  @Output("sendTo") sendTo: EventEmitter<Shareable> = new EventEmitter<Shareable>();

  onIdeaSelected(idea: Idea) {
    this.ideaSelected.emit(idea);
  }

  onIdeaEdit(idea: Idea) {
    this.ideaEdit.emit(idea);
  }

  onProblemSelected(problem: Problem) {
    this.problemSelected.emit(problem);
  }

  onUserSelected(user: User) {
    this.userSelected.emit(user);
  }

  onAnnounce(sharable: Shareable): void {
    this.announce.emit(sharable);
  }

  onBan(sharable: Shareable): void {
    this.ban.emit(sharable);
  }

  onReport(sharable: Shareable): void {
    this.report.emit(sharable);
  }

  onRemove(sharable: Shareable): void {
    this.remove.emit(sharable);
  }

  onShare(sharable: Shareable): void {
    this.share.emit(sharable);
  }

  onSendTo(sharable: Shareable): void {
    this.sendTo.emit(sharable);
  }
}
