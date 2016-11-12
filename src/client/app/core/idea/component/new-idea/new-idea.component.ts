/**
 * Created by PC on 10/10/2016.
 */
import {Component, ViewContainerRef} from '@angular/core';
import {Idea} from "../../../model/ideas/idea";
import {Logger} from "../../../../logger.service";
import {IdeaService} from "../../idea.service";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";

@Component({
  moduleId: module.id,
  selector: 'ideal-new-idea',
  templateUrl: 'new-idea.component.html',
  styleUrls: ['new-idea.component.css'],
})
export class NewIdeaComponent {
  idea: Idea;
  errorMessage: any;

  constructor(private logger:Logger, private ideaService: IdeaService, private snackBar: MdSnackBar, private viewContainerRef: ViewContainerRef) {

  }

  ngOnInit(): void {
    this.idea = new Idea();
  }

  createIdea(idea:Idea) {
    this.ideaService.addIdea(idea)
      .then(
        idea => this.ideaCreated(),
        error => this.errorMessage = <any>error
      );
  }

  ideaCreated() {
    this.idea = new Idea();
    var config = new MdSnackBarConfig();
    this.snackBar.open('Idea creation successful', 'OK', config);
  }
}
