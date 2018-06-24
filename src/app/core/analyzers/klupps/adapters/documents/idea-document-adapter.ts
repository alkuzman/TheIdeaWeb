import {BoostedDocumentEntry, BoostedDocumentEntryImpl, Document} from '@klupps/analyzer-sdk';
import {Idea} from '../../../../../domain/model/ideas';
import {SneakPeekDocumentEntryAdapter} from './entries/sneak-peek-document-entry-adapter';
import {TitledEntityDocumentEntry} from './entries/titled-entity-document-entry';

export class IdeaDocumentAdapter implements Document {
  public constructor(private readonly idea: Idea) {
  }

  getDocumentEntries(): BoostedDocumentEntry[] {
    return [
      new BoostedDocumentEntryImpl(new TitledEntityDocumentEntry(this.idea, 'ideaTitle'), 2),
      new BoostedDocumentEntryImpl(new SneakPeekDocumentEntryAdapter(this.idea), 1)
    ];
  }

  getId(): string {
    return 'idea';
  }
}
