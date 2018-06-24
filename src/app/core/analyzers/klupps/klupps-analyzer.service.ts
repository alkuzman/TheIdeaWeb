import {Analyzer} from '../analyzer';
import {Problem, Solution} from '../../../domain/model/ideas';
import {Observable} from 'rxjs';
import {AnalyzerSdk} from '@klupps/analyzer-sdk';
import {map} from 'rxjs/operators';
import {SolutionQuality} from '../../../domain/model/analyzers/analysis/solution-quality';
import {KluppsAnalysisRequestFactory} from './factories/klupps-analysis-request-factory';
import {Keyword} from '../../../domain/model/ideas/keyword';
import {KluppsAnalysisResponseFactory} from './factories/klupps-analysis-response-factory';

export class KluppsAnalyzerService implements Analyzer {

  constructor(private readonly analyzerSdk: AnalyzerSdk,
              private readonly analysisRequestFactory: KluppsAnalysisRequestFactory,
              private readonly analysisResponseFactory: KluppsAnalysisResponseFactory) {
  }

  analyzeSolution(solution: Solution): Observable<SolutionQuality> {
    const request = this.analysisRequestFactory.analysisRequestsFromSolution(solution);
    return this.analyzerSdk.analize(
      request
    ).pipe(
      map(
        response => this.analysisResponseFactory.solutionQuality(response)
      )
    );
  }

  getProblemKeywords(problem: Problem): Observable<Keyword[]> {
    const request = this.analysisRequestFactory.keywordAnalysisRequestsFromProblem(problem);
    return this.analyzerSdk.analize(
      request
    ).pipe(
      map(
        response => this.analysisResponseFactory.keywords(response)
      )
    );
  }

  getSolutionKeywords(solution: Solution): Observable<Keyword[]> {
    const request = this.analysisRequestFactory.keywordAnalysisRequestsFromSolution(solution);
    return this.analyzerSdk.analize(
      request
    ).pipe(
      map(
        response => this.analysisResponseFactory.keywords(response)
      )
    );
  }
}
