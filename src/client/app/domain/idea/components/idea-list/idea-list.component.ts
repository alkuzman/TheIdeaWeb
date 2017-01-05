/**
 * Created by PC on 10/10/2016.
 */
/**
 * Created by PC on 10/10/2016.
 */
import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {Idea} from "../../../model/ideas/idea";
import {IdeaService} from "../../idea.service";
import {User} from "../../../model/authentication/user";
import {Problem} from "../../../model/ideas/problem";

@Component({
  moduleId: module.id,
  selector: 'ideal-idea-list',
  templateUrl: 'idea-list.component.html',
  styleUrls: ['idea-list.component.css'],
})
export class IdeasComponent {
  @Input("ideas") ideas: Idea[];
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

  onIdeaSelected(idea: Idea) {
    this.ideaSelected.emit(idea);
  }

  onIdeaOwnerSelected(owner: User) {
    this.ideaOwnerSelected.emit(owner);
  }

  onIdeaProblemSelected(problem: Problem) {
    this.ideaProblemSelected.emit(problem);
  }

  onAnnounce(idea: Idea) {
    this.announce.emit(idea);
  }

  onSendTo(idea: Idea) {
    this.sendTo.emit(idea);
  }

  onShare(idea: Idea) {
    this.share.emit(idea);
  }

  onEdit(idea: Idea) {
    this.edit.emit(idea);
  }

  onRemove(idea: Idea) {
    this.remove.emit(idea);
  }

  onReport(idea: Idea) {
    this.report.emit(idea);
  }

  onBan(idea: Idea) {
    this.ban.emit(idea);
  }
}
