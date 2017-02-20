import {Problem} from "../ideas/problem";
/**
 * Created by AKuzmanoski on 18/02/2017.
 */
export class ProblemLite {
  public title: string;
  public text: string;

  constructor(problem: Problem) {
    this.title = problem.title;
    this.text = problem.text;
  }
}
