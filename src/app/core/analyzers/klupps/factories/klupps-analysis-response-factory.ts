import {Analyses} from '@klupps/analyzer-sdk';
import {SolutionQuality} from '../../../../domain/model/analyzers/analysis/solution-quality';
import {Keyword} from '../../../../domain/model/ideas/keyword';

export abstract class KluppsAnalysisResponseFactory {
  public abstract solutionQuality(analyses: Analyses): SolutionQuality;

  public abstract keywords(analyses: Analyses): Keyword[];
}
