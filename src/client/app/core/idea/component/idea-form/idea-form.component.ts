/**
 * Created by PC on 10/10/2016.
 */
import {Component, EventEmitter, Output, Input, OnInit} from "@angular/core";
import {Idea} from "../../../model/ideas/idea";
import {Problem} from "../../../model/ideas/problem";

@Component({
  moduleId: module.id,
  selector: 'ideal-idea-form',
  templateUrl: 'idea-form.component.html',
  styleUrls: ['idea-form.component.css'],
})
export class IdeaFormComponent implements OnInit {
  @Input("idea") public idea: Idea;
  active = true;
  @Output("ideaReady") ideaReady: EventEmitter<Idea> = new EventEmitter<Idea>();

  ngOnInit(): void {
    this.idea = new Idea();
    this.idea.problem = new Problem();
    this.idea.problem.title = "One problem";
  }

  save(): boolean {
    this.ideaReady.emit(this.idea);
    return true;
  }

  clearForm(): void {
    this.idea = new Idea();
    this.idea.problem = new Problem();
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}
