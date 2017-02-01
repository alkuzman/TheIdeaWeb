/**
 * Created by AKuzmanoski on 03/12/2016.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Idea} from "../../../domain/model/ideas/idea";
import {Alignment} from "../../../shared/widget/components/avatars/named-avatar/enum-alignment";
@Component({
  moduleId: module.id,
  selector: "ideal-idea-details-page",
  templateUrl: "idea-details-page.component.html"
})
export class IdeaDetailsPageComponent implements OnInit {
  private idea: Idea;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: {idea: Idea}) => {
      this.idea = data.idea;
    })
  }

  onIdeaReady(idea: Idea) {
    this.idea = idea;
  }
}
