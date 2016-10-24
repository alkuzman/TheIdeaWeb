/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Component} from "@angular/core";
import {Logger} from "../../../logger.service";
import {Problem} from "../../../core/model/ideas/problem";

@Component({
  moduleId: module.id,
  selector: 'ideal-new-problem-page',
  templateUrl: 'new-problem-page.component.html',
  styleUrls: ['new-problem-page.component.css'],
})
export class NewProblemPageComponent {
  submitText = "Save";

  constructor(private logger: Logger) {

  }

  problemCreated(problem: Problem) {
    console.log(problem);
  }
}
