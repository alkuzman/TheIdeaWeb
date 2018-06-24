import {KluppsAnalysisRequestFactory} from './klupps-analysis-request-factory';
import {AnalysisRequestFactory, AnalysisRequests} from '@klupps/analyzer-sdk';
import {Problem, Solution} from '../../../../domain/model/ideas';
import {SolutionContentDocumentAdapter} from '../adapters/documents/solution-content-document-adapter';
import {SolutionDocumentAdapter} from '../adapters/documents/solution-document-adapter';
import {IdeaDocumentAdapter} from '../adapters/documents/idea-document-adapter';
import {ProblemDocumentAdapter} from '../adapters/documents/problem-document-adapter';

export class KluppsAnalysisRequestFactoryImplService implements KluppsAnalysisRequestFactory {

  constructor(private readonly analysisRequestFactory: AnalysisRequestFactory) {
  }

  analysisRequestsFromSolution(solution: Solution): AnalysisRequests {
    const problemDocument = new ProblemDocumentAdapter(solution.idea.problem);
    const ideaDocument = new IdeaDocumentAdapter(solution.idea);
    const solutionContentDocument = new SolutionContentDocumentAdapter(solution);

    const analysisRequests = this.analysisRequestFactory.newAnalysisRequests();
    analysisRequests.newCoverageAnalysisRequest(problemDocument, solutionContentDocument);
    analysisRequests.newSneakPeekAnalysisRequest(ideaDocument, solutionContentDocument);

    return analysisRequests;
  }

  keywordAnalysisRequestsFromProblem(problem: Problem): AnalysisRequests {
    const problemDocument = new ProblemDocumentAdapter(problem);
    const analysisRequests = this.analysisRequestFactory.newAnalysisRequests();
    analysisRequests.newKeywordAnalysisRequest(problemDocument);
    return analysisRequests;
  }

  keywordAnalysisRequestsFromSolution(solution: Solution): AnalysisRequests {
    const solutionDocument = new SolutionDocumentAdapter(solution);
    const analysisRequests = this.analysisRequestFactory.newAnalysisRequests();
    analysisRequests.newKeywordAnalysisRequest(solutionDocument);
    return analysisRequests;
  }
}
