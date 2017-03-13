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
  private min: number = 0;
  private max: number = 100;
  private step: number = 1;
  private thumbLabel: boolean = true;
  private vertical: boolean = false;
}
