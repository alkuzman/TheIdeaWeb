import {BoostedDocumentEntry, BoostedDocumentEntryImpl, Document} from '@klupps/analyzer-sdk';
import {Solution} from '../../../../../domain/model/ideas';
import {SneakPeekDocumentEntryAdapter} from './entries/sneak-peek-document-entry-adapter';
import {TitledEntityDocumentEntry} from './entries/titled-entity-document-entry';
import {EntityWithTextDocumentEntry} from './entries/entity-with-text-document-entry';

export class SolutionDocumentAdapter implements Document {
  public constructor(private readonly solution: Solution) {
  }

  getDocumentEntries(): BoostedDocumentEntry[] {
    return [
      new BoostedDocumentEntryImpl(new TitledEntityDocumentEntry(this.solution.idea, 'ideaTitle'), 3),
      new BoostedDocumentEntryImpl(new SneakPeekDocumentEntryAdapter(this.solution.idea), 2),
      new BoostedDocumentEntryImpl(new EntityWithTextDocumentEntry(this.solution, 'solutionText'), 1)
    ];
  }

  getId(): string {
    return 'solution';
  }
}
