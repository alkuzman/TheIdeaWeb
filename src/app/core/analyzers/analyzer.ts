import {Problem, Solution} from '../../domain/model/ideas';
import {Observable} from 'rxjs';
import {SolutionQuality} from '../../domain/model/analyzers/analysis/solution-quality';
import {Keyword} from '../../domain/model/ideas/keyword';

export abstract class Analyzer {
  abstract analyzeSolution(solution: Solution): Observable<SolutionQuality>;

  abstract getProblemKeywords(problem: Problem): Observable<Keyword[]>;

  abstract getSolutionKeywords(solution: Solution): Observable<Keyword[]>;
}
