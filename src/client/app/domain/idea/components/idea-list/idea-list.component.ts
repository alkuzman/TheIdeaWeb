/**
 * Created by PC on 10/10/2016.
 */
/**
 * Created by PC on 10/10/2016.
 */
import {Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import {Idea} from "../../../model/ideas/idea";
import {IdeaService} from "../../idea.service";

@Component({
  moduleId: module.id,
  selector: 'ideal-idea-list',
  templateUrl: 'idea-list.component.html',
  styleUrls: ['idea-list.component.css'],
})
export class IdeasComponent implements OnInit {
  @Input("problemId") problemId: number;
  @Input("ownerId") ownerId: number;
  @Output("ideaListReady") ideaListReady: EventEmitter<Idea[]> = new EventEmitter<Idea[]>();
  @Output() ideaSelected: EventEmitter<Idea> = new EventEmitter<Idea>();
  ideas: Idea[];
  errorMessage: any;

  constructor(public ideaService: IdeaService) {

  }

  ngOnInit(): void {
    this.ideaService.getIdeas({
      problemId: this.problemId != null ? this.problemId.toString() : null,
      ownerId: this.ownerId != null ? this.ownerId.toString() : null
    })
      .subscribe(
        (ideaList: Idea[]) => this.onIdeaListReady(ideaList),
        error => this.errorMessage = <any>error);
  }

  onIdeaListReady(ideaList: Idea[]) {
    this.ideas = ideaList;
    this.ideaListReady.emit(this.ideas);
  }

  onIdeaSelected(idea: Idea) {
    this.ideaSelected.emit(idea);
  }
}
