/**
 * Created by AKuzmanoski on 24/10/2016.
 */
import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Problem} from "../../../model/ideas/problem";
import {Actions} from "../../../../core/helper/actions/actions";
import {ProblemActionsService} from "../../../services/problem/problem-actions.service";
import {Action} from "../../../../core/helper/actions/action";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-card",
  templateUrl: "problem-card.component.html",
  styleUrls: ["problem-card.component.css"]
})
export class ProblemCardComponent implements OnInit{
  @Input("problem") problem: Problem;
  @Output("openContent") openContent: EventEmitter<void> = new EventEmitter<void>();
  @Output("announce") announce: EventEmitter<Problem> = new EventEmitter<Problem>();
  @Output("sendTo") sendTo: EventEmitter<Problem> = new EventEmitter<Problem>();
  private actions: Actions;

  constructor(private problemActionsService: ProblemActionsService) {}

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

  onAction(action: Action) {
    if (action.title == "Announce")
      this.onAnnounce();
    else if (action.title == "Send")
      this.onSendTo();
  }
}
