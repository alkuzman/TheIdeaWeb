/**
 * Created by AKuzmanoski on 26/10/2016.
 */
import {Component} from "@angular/core";
import {Idea} from "../../../domain/model/ideas/idea";
import {Router, ActivatedRoute} from "@angular/router";
@Component({
  moduleId: module.id,
  selector: "ideal-ideas-page",
  templateUrl: "ideas-page.component.html"
})
export class IdeasPageComponent {
  constructor(private router: Router, private route: ActivatedRoute) {

  }

  goToDetails(idea: Idea) {
    this.router.navigate([idea.id], {relativeTo: this.route})
  }
}
