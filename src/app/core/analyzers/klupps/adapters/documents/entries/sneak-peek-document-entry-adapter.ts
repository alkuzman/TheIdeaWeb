import {DocumentEntry} from '@klupps/analyzer-sdk';
import {Idea} from '../../../../../../domain/model/ideas';

export class SneakPeekDocumentEntryAdapter implements DocumentEntry {
  public constructor(private readonly idea: Idea) {
  }

  getContent(): string {
    return this.idea.snackPeak;
  }

  getContentType(): string {
    return 'text/plain';
  }

  getId(): string {
    return 'sneakPeek';
  }
}
