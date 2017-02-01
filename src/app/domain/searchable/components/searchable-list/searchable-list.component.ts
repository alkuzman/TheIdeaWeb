import {Component, Input, EventEmitter, Output} from "@angular/core";
import {Searchable} from "../../../model/sharing/searchable";
import {Announcement} from "../../../model/sharing/announcement";
import {User} from "../../../model/authentication/user";
import {Sharable} from "../../../model/sharing/sharable";
import {Problem} from "../../../model/ideas/problem";
import {Idea} from "../../../model/ideas/idea";
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
  @Output("announcementSelected") announcementSelected: EventEmitter<Announcement> = new EventEmitter<Announcement>();

  onAnnouncementSelected(announcement: Announcement) {
    this.announcementSelected.emit(announcement);
  }

  @Output("ideaSelected") ideaSelected: EventEmitter<Idea> = new EventEmitter<Idea>();
  @Output("ideaEdit") ideaEdit: EventEmitter<Idea> = new EventEmitter<Idea>();
  @Output("problemSelected") problemSelected: EventEmitter<Problem> = new EventEmitter<Problem>();
  @Output("userSelected") userSelected: EventEmitter<User> = new EventEmitter<User>();
  @Output("announce") announce: EventEmitter<Sharable> = new EventEmitter<Sharable>();
  @Output("ban") ban: EventEmitter<Sharable> = new EventEmitter<Sharable>();
  @Output("report") report: EventEmitter<Sharable> = new EventEmitter<Sharable>();
  @Output("remove") remove: EventEmitter<Sharable> = new EventEmitter<Sharable>();
  @Output("share") share: EventEmitter<Sharable> = new EventEmitter<Sharable>();
  @Output("sendTo") sendTo: EventEmitter<Sharable> = new EventEmitter<Sharable>();

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

  onAnnounce(sharable: Sharable): void {
    this.announce.emit(sharable);
  }

  onBan(sharable: Sharable): void {
    this.ban.emit(sharable);
  }

  onReport(sharable: Sharable): void {
    this.report.emit(sharable);
  }

  onRemove(sharable: Sharable): void {
    this.remove.emit(sharable);
  }

  onShare(sharable: Sharable): void {
    this.share.emit(sharable);
  }

  onSendTo(sharable: Sharable): void {
    this.sendTo.emit(sharable);
  }
}
