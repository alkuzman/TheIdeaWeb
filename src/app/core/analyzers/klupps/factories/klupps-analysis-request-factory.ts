import {Problem, Solution} from '../../../../domain/model/ideas';
import {AnalysisRequests} from '@klupps/analyzer-sdk';

export abstract class KluppsAnalysisRequestFactory {
  abstract analysisRequestsFromSolution(solution: Solution): AnalysisRequests;

  abstract keywordAnalysisRequestsFromProblem(problem: Problem): AnalysisRequests;

  abstract keywordAnalysisRequestsFromSolution(solution: Solution): AnalysisRequests;
}
