/**
 * Created by AKuzmanoski on 15/01/2017.
 */
import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {Announcement} from "../../../model/sharing/announcement";
import {AnnouncementService} from "../../../services/announcement/announcement.service";
import {Shareable} from "../../../model/sharing/shareable";
import {User} from "../../../model/authentication/user";
import {Problem} from "../../../model/ideas/problem";
import {Idea} from "../../../model/ideas/idea";
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-list-loader",
  template: `
    <ideal-announcement-list
      *ngIf="announcementList"
      [announcementList]='announcementList'
      (userSelected)="onUserSelected($event)"
      (openContent)="getContent($event)"
      (ideaSelected)="onIdeaSelected($event)"
      (problemSelected)="onProblemSelected($event)"
      (ideaEdit)="onIdeaEdit($event)"
      (announce)="onAnnounce($event)"
      (ban)="onBan($event)"
      (edit)="onIdeaEdit($event)"
      (remove)="onRemove($event)"
      (report)="onReport($event)"
      (sendTo)="onSendTo($event)"
      (share)="onShare($event)"></ideal-announcement-list>`
})
export class AnnouncementListLoaderComponent implements OnInit {
  @Input("ownerId") ownerId: number;
  announcementList: Announcement[];

  constructor(private announcementService: AnnouncementService) {

  }

  ngOnInit(): void {
    this.announcementService.getAnnouncementList({ownerId: this.ownerId.toString()}).subscribe((value: Announcement[]) => {
      this.announcementList = value;
    });

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
  @Output("contentSelected") contentSelected: EventEmitter<Announcement> = new EventEmitter<Announcement>();

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

  getContent(announcement: Announcement) {
    this.contentSelected.emit(announcement);
  }
}
