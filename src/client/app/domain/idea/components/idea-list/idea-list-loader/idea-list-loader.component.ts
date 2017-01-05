/**
 * Created by AKuzmanoski on 05/01/2017.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Idea} from "../../../../model/ideas/idea";
import {User} from "../../../../model/authentication/user";
import {Problem} from "../../../../model/ideas/problem";
import {IdeaService} from "../../../idea.service";
@Component({
  moduleId: module.id,
  selector: "ideal-idea-list-loader",
  template: `<ideal-idea-list [ideas]="ideas" (ideaSelected)="onIdeaSelected(idea)"
                 (ideaOwnerSelected)="onIdeaOwnerSelected(idea.owner)"
                 (ideaProblemSelected)="onIdeaProblemSelected(idea.problem)"
                 (announce)="onAnnounce($event)"
                 (sendTo)="onSendTo($event)"
                 (share)="onShare($event)"
                 (edit)="onEdit($event)"
                 (remove)="onRemove($event)"
                 (report)="onReport($event)"
                 (ban)="onBan($event)"></ideal-idea-list>`
})
export class IdeaListLoaderComponenet {
  @Input("problemId") problemId: number;
  @Input("ownerId") ownerId: number;
  @Output("ideaListReady") ideaListReady: EventEmitter<Idea[]> = new EventEmitter<Idea[]>();
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
  ideas: Idea[];

  constructor(public ideaService: IdeaService) {

  }


  ngOnInit(): void {
    this.ideaService.getIdeas({
      problemId: this.problemId != null ? this.problemId.toString() : null,
      ownerId: this.ownerId != null ? this.ownerId.toString() : null
    })
      .subscribe(
        (ideaList: Idea[]) => this.onIdeaListReady(ideaList));
  }

  onIdeaListReady(ideaList: Idea[]) {
    this.ideas = ideaList;
    this.ideaListReady.emit(this.ideas);
  }

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
