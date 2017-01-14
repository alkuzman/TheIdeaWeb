/**
 * Created by AKuzmanoski on 24/10/2016.
 */
import {
  Component, Input, OnInit, Output, EventEmitter, animate, transition, style, state,
  trigger
} from "@angular/core";
import {Problem} from "../../../model/ideas/problem";
import {ProblemService} from "../../../services/problem/problem.service";
import {Scheduler} from "rxjs";
@Component({
  moduleId: module.id,
  selector: "ideal-problem-list",
  templateUrl: "problem-list.component.html",
  styleUrls: ["problem-list.component.css"],
  animations: [
    trigger('loading', [
      state('init', style({
        opacity: 0,
        transform: 'translateY(10px)'
      })),
      state('active', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition("init => active", [

        animate("160ms ease-out", style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ]),
      transition("active => init", [
        animate("150ms ease-in", style({
          opacity: 0,
          transform: 'translateY(10px)'
        }))
      ])
    ])
  ]
})
export class ProblemListComponent implements OnInit {
  @Input("problems") problems: Problem[];
  @Output("problemSelected") problemSelected: EventEmitter<Problem> = new EventEmitter<Problem>();
  private status: string[] = [];

  ngOnInit(): void {
    let queueRefresh = Scheduler.queue;
    this.problems.forEach((item, index) => {
      this.status[index] = "init";
      let timeout = (index * 40);
      queueRefresh.schedule(() => {
        this.changeStatus(index);
      }, timeout);
    });
  }

  changeStatus(index: number) {
    this.status[index] = "active";
  }

  onProblemSelected(problem: Problem) {
    this.problemSelected.emit(problem);
  }
}
