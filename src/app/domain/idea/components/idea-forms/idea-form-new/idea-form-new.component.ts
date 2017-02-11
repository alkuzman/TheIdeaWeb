/**
 * Created by PC on 10/10/2016.
 */
import {Component, ViewContainerRef} from "@angular/core";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {Logger} from "../../../../../logger.service";
import {Idea} from "../../../../model/ideas/idea";
import {IdeaService} from "../../../../services/idea/idea.service";

@Component({
  moduleId: module.id,
  selector: 'ideal-idea-form-new',
  templateUrl: 'idea-form-new.component.html',
  styleUrls: ['idea-form-new.component.scss'],
})
export class NewIdeaComponent {
  idea: Idea;
  errorMessage: any;

  constructor(private logger: Logger, private ideaService: IdeaService, private snackBar: MdSnackBar, private viewContainerRef: ViewContainerRef) {

  }

  ngOnInit(): void {
    this.idea = new Idea();
  }

  createIdea(idea: Idea) {
    this.ideaService.addIdea(idea)
      .subscribe(
        (idea: Idea) => this.ideaCreated(),
        (error: any) => this.errorMessage = error
      );
  }

  ideaCreated() {
    this.idea = new Idea();
    var config = new MdSnackBarConfig();
    this.snackBar.open('Idea creation successful', 'OK', config);
  }
}
