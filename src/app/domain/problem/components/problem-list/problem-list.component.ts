/**
 * Created by AKuzmanoski on 24/10/2016.
 */
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  animate,
  transition,
  style,
  state,
  trigger
} from "@angular/core";
import {Problem} from "../../../model/ideas/problem";
import {Scheduler} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {User} from "../../../model/authentication/user";
import {Organization} from "../../../model/authentication/organization";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-list",
  templateUrl: "problem-list.component.html",
  styleUrls: ["problem-list.component.scss"],
})
export class ProblemListComponent implements OnInit {
  @Input("problems") problems: Problem[];
  @Output("problemSelected") problemSelected: EventEmitter<Problem> = new EventEmitter<Problem>();
  @Output("announce") announce: EventEmitter<Problem> = new EventEmitter<Problem>();
  @Output("sendTo") sendTo: EventEmitter<Problem> = new EventEmitter<Problem>();
  @Output("share") share: EventEmitter<Problem> = new EventEmitter<Problem>();
  @Output("edit") edit: EventEmitter<Problem> = new EventEmitter<Problem>();
  @Output("report") report: EventEmitter<Problem> = new EventEmitter<Problem>();
  @Output("remove") remove: EventEmitter<Problem> = new EventEmitter<Problem>();
  @Output("ban") ban: EventEmitter<Problem> = new EventEmitter<Problem>();
  @Output("questionerUserSelected") questionerUserSelected: EventEmitter<User> = new EventEmitter<User>();
  @Output("questionerOrganizationSelected") questionerOrganizationSelected: EventEmitter<Organization> = new EventEmitter<Organization>();
  status: string[] = [];

  ngOnInit(): void {
    let queueRefresh = Scheduler.queue;
    this.problems.forEach((item, index) => {
      this.status[index] = "init";
    });
    let maxNum = this.problems.length;
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

  changeStatus(index: number) {
    this.status[index] = "active";
  }

  onProblemSelected(problem: Problem) {
    this.problemSelected.emit(problem);
  }

  onQuestionerUserSelected(questioner: User) {
    this.questionerUserSelected.emit(questioner);
  }

  onQuestionerOrganizationSelected(questioner: Organization) {
    this.questionerOrganizationSelected.emit(questioner);
  }

  onAnnounce(problem: Problem) {
    this.announce.emit(problem);
  }

  onSendTo(problem: Problem) {
    this.sendTo.emit(problem);
  }

  onShare(problem: Problem) {
    this.share.emit(problem);
  }

  onReport(problem: Problem) {
    this.report.emit(problem);
  }

  onBan(problem: Problem) {
    this.ban.emit(problem);
  }

  onEdit(problem: Problem) {
    this.edit.emit(problem);
  }

  onRemove(problem: Problem) {
    this.remove.emit(problem);
  }
}
