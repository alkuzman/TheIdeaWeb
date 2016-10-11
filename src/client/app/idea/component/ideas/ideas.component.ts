/**
 * Created by PC on 10/10/2016.
 */
/**
 * Created by PC on 10/10/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Idea} from "../../idea";
import {IdeaService} from "../../idea.service";

@Component({
  moduleId: module.id,
  selector: 'ideal-ideas',
  templateUrl: 'ideas.component.html',
  styleUrls: ['ideas.component.css'],
})
export class IdeasComponent implements OnInit {
  ideas: Idea[];
  errorMessage: any;

  constructor(public ideaService: IdeaService) {

  }

  ngOnInit(): void {
    this.ideaService.getIdeas()
      .subscribe(
        ideas => this.ideas = ideas,
        error => this.errorMessage = <any>error);
  }
}
