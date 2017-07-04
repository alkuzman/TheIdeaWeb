/**
 * Created by AKuzmanoski on 09/01/2017.
 */
import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Announcement} from "../../../model/sharing/announcement";
import {Idea} from "../../../model/ideas/idea";
import {Problem} from "../../../model/ideas/problem";
import {User} from "../../../model/authentication/user";
import {Shareable} from "../../../model/sharing/sharable";
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
