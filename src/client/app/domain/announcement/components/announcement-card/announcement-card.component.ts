/**
 * Created by AKuzmanoski on 09/01/2017.
 */
import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Announcement} from "../../../model/sharing/announcement";
import {Idea} from "../../../model/ideas/idea";
import {Problem} from "../../../model/ideas/problem";
import {User} from "../../../model/authentication/user";
import {Sharable} from "../../../model/sharing/sharable";
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-card",
  templateUrl: "announcement-card.component.html"
})
export class AnnouncementCardComponent implements OnInit {
  @Input("announcement") announcement: Announcement;
  @Output("openContent") openContent: EventEmitter<Announcement> = new EventEmitter<Announcement>();

  ngOnInit(): void {
  }

  getContent() {
    this.openContent.emit(this.announcement)
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
