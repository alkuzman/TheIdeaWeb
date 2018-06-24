import {KluppsAnalysisResponseFactory} from './klupps-analysis-response-factory';
import {Analyses, DescriptiveAnalysisScore, Keyword as ApiKeyword} from '@klupps/analyzer-sdk';
import {SolutionQualityStatus} from '../../../../domain/model/analyzers/analysis/solution-quality-status';
import {Keyword} from '../../../../domain/model/ideas/keyword';
import {SolutionQuality} from '../../../../domain/model/analyzers/analysis/solution-quality';
import {ProblemCoverage} from '../../../../domain/model/analyzers/analysis/problem-coverage';
import {SnackPeakQuality} from '../../../../domain/model/analyzers/analysis/snack-peak-quality';

export class KluppsAnalysisResponseFactoryImplService implements KluppsAnalysisResponseFactory {

  constructor() {
  }

  public keywords(analyses: Analyses): Keyword[] {
    const keywords: Keyword[] = [];
    analyses.getKeywordAnalyses().forEach(ka => ka.getKeywords().forEach(k => keywords.push(this.getKeyword(k))));
    return keywords;
  }

  public solutionQuality(analyses: Analyses): SolutionQuality {
    const solutionQuality = new SolutionQuality();
    const problemCoverage = new ProblemCoverage();
    const snackPeakQuality = new SnackPeakQuality();
    solutionQuality.problemCoverage = problemCoverage;
    solutionQuality.snackPeakQuality = snackPeakQuality;
    problemCoverage.coverage = analyses.getCoverageAnalyses()[0].getScore();
    problemCoverage.status = this.getStatus(analyses.getCoverageAnalyses()[0].getDescriptiveScore());
    problemCoverage.coveredKeywords = analyses.getCoverageAnalyses()[0].getCoveredKeywords().map(k => this.getKeyword(k));
    problemCoverage.notCoveredKeywords = analyses.getCoverageAnalyses()[0].getNotCoveredKeywords().map(k => this.getKeyword(k));
    snackPeakQuality.quality = analyses.getSneakPeekAnalyses()[0].getScore();
    snackPeakQuality.status = this.getAcceptable(analyses.getSneakPeekAnalyses()[0].getDescriptiveScore());
    return solutionQuality;
  }

  private getAcceptable(score: DescriptiveAnalysisScore): boolean {
    switch (score) {
      case DescriptiveAnalysisScore.PURE:
        return false;
      case DescriptiveAnalysisScore.FAIR:
        return true;
      case DescriptiveAnalysisScore.GOOD:
        return true;
      case DescriptiveAnalysisScore.EXCELLENT:
        return true;
      default:
        return false;
    }
  }

  private getStatus(score: DescriptiveAnalysisScore): SolutionQualityStatus {
    switch (score) {
      case DescriptiveAnalysisScore.PURE:
        return SolutionQualityStatus.POOR;
      case DescriptiveAnalysisScore.FAIR:
        return SolutionQualityStatus.FAIR;
      case DescriptiveAnalysisScore.GOOD:
        return SolutionQualityStatus.GOOD;
      case DescriptiveAnalysisScore.EXCELLENT:
        return SolutionQualityStatus.GOOD;
      default:
        return SolutionQualityStatus.POOR;
    }
  }

  private getKeyword(keyword: ApiKeyword): Keyword {
    const k = new Keyword();
    k.phrase = keyword.getPhrase();
    k.score = keyword.getScore();
    return k;
  }
}
