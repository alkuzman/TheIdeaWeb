import {BoostedDocumentEntry, BoostedDocumentEntryImpl, Document} from '@klupps/analyzer-sdk';
import {Problem} from '../../../../../domain/model/ideas';
import {TitledEntityDocumentEntry} from './entries/titled-entity-document-entry';
import {EntityWithTextDocumentEntry} from './entries/entity-with-text-document-entry';

export class ProblemDocumentAdapter implements Document {

  public constructor(private readonly problem: Problem) {
  }

  getDocumentEntries(): BoostedDocumentEntry[] {
    return [
      new BoostedDocumentEntryImpl(new TitledEntityDocumentEntry(this.problem, 'problemTitle'), 2),
      new BoostedDocumentEntryImpl(new EntityWithTextDocumentEntry(this.problem, 'problemText'), 1),
    ];
  }

  getId(): string {
    return 'problem';
  }
}
