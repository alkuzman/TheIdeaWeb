/**
 * Created by AKuzmanoski on 13/03/2017.
 */
import {Component, Input} from "@angular/core";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-coverage-value",
  templateUrl: "problem-coverage-value.component.html"
})
export class ProblemCoverageValueComponent {
  @Input("coverage") coverage: number;
  min: number = 0;
  max: number = 100;
  step: number = 1;
  thumbLabel: boolean = true;
  vertical: boolean = false;
}
