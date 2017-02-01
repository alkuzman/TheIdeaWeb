/**
 * Created by AKuzmanoski on 24/10/2016.
 */
import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Problem} from "../../../model/ideas/problem";
import {Actions} from "../../../../core/helper/actions/actions";
import {ProblemActionsService} from "../../../services/problem/problem-actions.service";
import {Action} from "../../../../core/helper/actions/action";
import {User} from "../../../model/authentication/user";
import {Person} from "../../../model/authentication/person";
import {Organization} from "../../../model/authentication/organization";
import {Member} from "../../../model/authentication/member";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-card",
  templateUrl: "problem-card.component.html",
  styleUrls: ["problem-card.component.scss"]
})
export class ProblemCardComponent implements OnInit {
  @Input("problem") problem: Problem;
  @Output("openContent") openContent: EventEmitter<void> = new EventEmitter<void>();
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
  private actions: Actions;

  constructor(private problemActionsService: ProblemActionsService) {
  }

  ngOnInit() {
    this.actions = this.problemActionsService.getActions(this.problem);
  }

  getContent() {
    this.openContent.emit();
  }

  onAnnounce() {
    this.announce.emit(this.problem);
  }

  onSendTo() {
    this.sendTo.emit(this.problem);
  }

  onUpvote() {

  }

  onDownvote() {

  }

  onShare() {
    this.share.emit(this.problem);
  }

  onEdit() {
    this.edit.emit(this.problem);
  }

  onRemove() {
    this.remove.emit(this.problem);
  }

  onReport() {
    this.report.emit(this.problem);
  }

  onBan() {
    this.ban.emit(this.problem);
  }

  onQuestionerUserSelected() {
    let user: User = <User>this.problem.questioner;
    this.questionerUserSelected.emit(user);
  }

  onQuestionerOrganizationSelected() {
    let member: Member = <Member>this.problem.questioner;
    this.questionerOrganizationSelected.emit(member.organization);
  }

  onMemberSelected() {

  }

  onQuestionerSelected() {
    let questioner: Person = this.problem.questioner;
    if (questioner.type == "User") {
      this.onQuestionerUserSelected();
    }
    else {
      this.onQuestionerOrganizationSelected();
    }
  }

  onProblemSelected() {
    this.problemSelected.emit(this.problem);
  }

  onAction(action: Action) {
    switch (action.title) {
      case "Questioner":
        this.onQuestionerSelected();
        break;
      case "Announce":
        this.onAnnounce();
        break;
      case "Send":
        this.onSendTo();
        break;
      case "Upvote":
        this.onUpvote();
        break;
      case "Downvote":
        this.onDownvote();
        break;
      case "Share":
        this.onShare();
        break;
      case "Edit":
        this.onEdit();
        break;
      case "Remove":
        this.onRemove();
        break;
      case "Report":
        this.onReport();
        break;
      case "Ban":
        this.onBan();
        break;
      case "Details":
        this.onProblemSelected();
        break;
      default:
        break;
    }
  }
}
