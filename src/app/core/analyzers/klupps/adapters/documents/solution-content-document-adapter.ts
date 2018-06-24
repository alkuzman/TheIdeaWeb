import {Solution} from '../../../../../domain/model/ideas';
import {BoostedDocumentEntry, BoostedDocumentEntryImpl, Document} from '@klupps/analyzer-sdk';
import {EntityWithTextDocumentEntry} from './entries/entity-with-text-document-entry';

export class SolutionContentDocumentAdapter implements Document {
  public constructor(private readonly solution: Solution) {
  }

  getDocumentEntries(): BoostedDocumentEntry[] {
    return [
      new BoostedDocumentEntryImpl(new EntityWithTextDocumentEntry(this.solution, 'solutionText'), 1),
    ];
  }

  getId(): string {
    return 'solutionContent';
  }
}
