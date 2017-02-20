import {Solution} from "../ideas/solution";
import {ProblemLite} from "./problem-lite";
/**
 * Created by AKuzmanoski on 18/02/2017.
 */
export class IdeaLite {
  public title: string;
  public snackPeak: string;
  public text: string;
  public problem: ProblemLite;

  constructor(solution: Solution) {
    this.title = solution.idea.title;
    this.snackPeak = solution.idea.snackPeak;
    this.text = solution.text;
    this.problem = new ProblemLite(solution.idea.problem)
  }
}
