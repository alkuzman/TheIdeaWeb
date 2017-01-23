import {
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  OnInit,
  Output,
  EventEmitter
} from "@angular/core";
import {Announcement} from "../../../model/sharing/announcement";
import {Scheduler} from "rxjs";
import {Idea} from "../../../model/ideas/idea";
import {Problem} from "../../../model/ideas/problem";
import {User} from "../../../model/authentication/user";
import {Sharable} from "../../../model/sharing/sharable";
import {TimerObservable} from "rxjs/observable/TimerObservable";
/**
 * Created by AKuzmanoski on 08/01/2017.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-list",
  templateUrl: "announcement-list.component.html",
  animations: [
    trigger('loading', [
      state('init', style({
        opacity: 0,
        transform: 'translateY(10px)'
      })),
      state('active', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition("init => active", [

        animate("160ms ease-out", style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ]),
      transition("active => init", [
        animate("150ms ease-in", style({
          opacity: 0,
          transform: 'translateY(10px)'
        }))
      ])
    ])
  ]
})
export class AnnouncementListComponent implements OnInit {
  @Input("announcementList") announcementList: Announcement[];
  @Output("openContent") openContent: EventEmitter<Announcement> = new EventEmitter<Announcement>();
  private status: string[] = [];

  ngOnInit(): void {
    let queueRefresh = Scheduler.queue;
    this.announcementList.forEach((item, index) => {
      this.status[index] = "init";
    });
    let maxNum = this.announcementList.length;
    let index = 0;
    let timer = TimerObservable.create(0, 40);
    let subscription = timer.subscribe(t => {
      if (index >= maxNum) {
        subscription.unsubscribe();
        return;
      }
      this.changeStatus(index);
      index++;
    });
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

  changeStatus(index: number) {
    this.status[index] = "active";
  }

  getContent(announcement: Announcement) {
    this.openContent.emit(announcement);
  }

}
