/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Idea} from "../../../model/ideas/idea";
import {User} from "../../../model/authentication/user";
import {Problem} from "../../../model/ideas/problem";
import {IdeaActionsService} from "../../../services/idea/idea-actions.service";
import {Actions} from "../../../../core/helper/actions/actions";
import {Action} from "../../../../core/helper/actions/action";
import {RedirectService} from "../../../../core/navigation/redirect.service";
@Component({
  moduleId: module.id,
  selector: "ideal-idea-card",
  templateUrl: "idea-card.component.html",
  styleUrls: ["idea-card.component.scss"]
})
export class IdeaCardComponent implements OnInit {
  @Input("idea") idea: Idea;
  @Output("openContent") openContent: EventEmitter<void> = new EventEmitter<void>();
  @Output("ideaSelected") ideaSelected: EventEmitter<Idea> = new EventEmitter<Idea>();
  @Output("ideaOwnerSelected") ideaOwnerSelected: EventEmitter<User> = new EventEmitter<User>();
  @Output("ideaProblemSelected") ideaProblemSelected: EventEmitter<Problem> = new EventEmitter<Problem>();
  @Output("announce") announce: EventEmitter<Idea> = new EventEmitter<Idea>();
  @Output("sendTo") sendTo: EventEmitter<Idea> = new EventEmitter<Idea>();
  @Output("share") share: EventEmitter<Idea> = new EventEmitter<Idea>();
  @Output("edit") edit: EventEmitter<Idea> = new EventEmitter<Idea>();
  @Output("report") report: EventEmitter<Idea> = new EventEmitter<Idea>();
  @Output("remove") remove: EventEmitter<Idea> = new EventEmitter<Idea>();
  @Output("ban") ban: EventEmitter<Idea> = new EventEmitter<Idea>();
  actions: Actions;

  constructor(private ideaActionsService: IdeaActionsService, private route: RedirectService) {

  }

  ngOnInit() {
    this.actions = this.ideaActionsService.getActions(this.idea);
  }

  getOwner() {
    this.ideaOwnerSelected.emit(this.idea.owner);
  }

  getDetails() {
    this.ideaSelected.emit(this.idea);
  }

  getProblem() {
    this.ideaProblemSelected.emit(this.idea.problem);
  }

  getContent() {
    this.openContent.emit();
  }

  onUpvote() {

  }

  onDownvote() {

  }

  onAnnounce() {
    this.announce.emit(this.idea);
  }

  onSendTo() {
    this.sendTo.emit(this.idea);
  }

  onShare() {
    this.share.emit(this.idea);
  }

  onEdit() {
    this.edit.emit(this.idea);
  }

  onRemove() {
    this.remove.emit(this.idea);
  }

  onReport() {
    this.report.emit(this.idea);
  }

  onBan() {
    this.ban.emit(this.idea);
  }

  onBuy() {
    this.route.newTransaction(this.idea);
  }

  onAction(action: Action) {
    if (action.title == "Details")
      this.getDetails();
    else if (action.title == "Problem")
      this.getProblem();
    else if (action.title == "Owner")
      this.getOwner();
    else if (action.title == "Upvote")
      this.onUpvote();
    else if (action.title == "Downvote")
      this.onDownvote();
    else if (action.title == "Announce")
      this.onAnnounce();
    else if (action.title == "Send")
      this.onSendTo();
    else if (action.title == "Share")
      this.onShare();
    else if (action.title == "Edit")
      this.onEdit();
    else if (action.title == "Remove")
      this.onRemove();
    else if (action.title == "Report")
      this.onReport();
    else if (action.title == "Ban")
      this.onBan();
    else if (action.title == "Buy")
      this.onBuy();
  }
}
