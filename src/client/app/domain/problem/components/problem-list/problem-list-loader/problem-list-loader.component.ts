/**
 * Created by AKuzmanoski on 05/01/2017.
 */
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ProblemService} from "../../../../services/problem/problem.service";
import {Problem} from "../../../../model/ideas/problem";
import {User} from "../../../../model/authentication/user";
import {Organization} from "../../../../model/authentication/organization";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-list-loader",
  template: `<ideal-problem-list 
*ngIf="problems" 
[problems]="problems" 
(problemSelected)="onProblemSelected($event)"
  (questionerOrganizationSelected)="onQuestionerOrganizationSelected($event)"
  (questionerUserSelected)="onQuestionerUserSelected($event)"
  (openContent)="onProblemSelected(problem)"
  (share)="onShare($event)"
  (report)="onReport($event)"
  (ban)="onBan($event)"
  (announce)="onAnnounce($event)"
  (remove)="onRemove($event)"
  (sendTo)="onSendTo($event)"
  (edit)="onEdit($event)"></ideal-problem-list>`
})
export class ProblemListLoaderComponent {
  @Input("questionerId") questionerId: number;
  problems: Problem[];
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

  constructor(private problemService: ProblemService) {

  }

  ngOnInit(): void {
    this.problemService.getProblems({
      questionerId: this.questionerId != null ? this.questionerId.toString() : null
    }).subscribe(
      problems => this.problems = problems);
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
