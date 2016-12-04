import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Idea} from "../../../../model/ideas/idea";
import {Response} from "@angular/http";
import {IdeaService} from "../../../idea.service";
/**
 * Created by AKuzmanoski on 03/12/2016.
 */
@Component({
  moduleId: module.id,
  selector: "ideal-idea-details-loader",
  templateUrl: "idea-details-loader.component.html"
})
export class IdeaDetailsLoaderComponent implements OnInit {
  @Input("ideaId") ideaId: number;
  @Output() ideaReady: EventEmitter<Idea> = new EventEmitter<Idea>();
  private idea: Idea;

  constructor(private ideaService: IdeaService) {

  }

  ngOnInit() {
    this.idea = new Idea();
    this.ideaService.getIdea(this.ideaId).subscribe((idea: Idea) => this.onIdeaReady(idea),
      (error: Response) => this.onError(error));
  }

  onIdeaReady(idea: Idea) {
    this.idea = idea;
    this.ideaReady.emit(idea);
  }

  onError(error: Response) {

  }
}
