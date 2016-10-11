/**
 * Created by PC on 10/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Idea} from "../../idea";
import {IdeaService} from "../../idea.service";

@Component({
  moduleId: module.id,
  selector: 'ideal-idea',
  templateUrl: 'idea.component.html',
  styleUrls: ['idea.component.css'],
})
export class IdeaComponent implements OnInit {
  idea: Idea;
  errorMessage: any;

  constructor(public ideaService: IdeaService) {

  }

  ngOnInit(): void {
    this.idea = new Idea();
    this.ideaService.getIdea(1)
      .subscribe(
        idea => this.idea = idea,
        error => this.errorMessage = <any>error);
  }
}
