/**
 * Created by AKuzmanoski on 14/11/2016.
 */
import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Problem} from '../../../../model/ideas';

@Component({
  moduleId: module.id,
  selector: 'ideal-problem-details',
  templateUrl: 'problem-details.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProblemDetailsComponent {
  @Input('problem') problem: Problem;
  @Input('hideTitle') hideTitle = false;
}
