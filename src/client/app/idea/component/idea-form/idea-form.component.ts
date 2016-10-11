/**
 * Created by PC on 10/10/2016.
 */
import {Component, EventEmitter, Output, Input} from "@angular/core";
import {Idea} from "../../idea";
import {Logger} from "../../../logger.service";

@Component({
  moduleId: module.id,
  selector: 'ideal-idea-form',
  templateUrl: './idea-form.component.html',
  styleUrls: ['./idea-form.component.css'],
})
export class IdeaFormComponent {
  @Input("idea") public idea: Idea;
  active = true;
  @Output("ideaReady") ideaReady : EventEmitter<Idea> = new EventEmitter();

  save(): boolean {
    this.ideaReady.emit(this.idea);
    return true;
  }

  clearForm(): void {
    this.idea = new Idea();
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}
