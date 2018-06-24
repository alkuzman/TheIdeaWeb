import {DocumentEntry} from '@klupps/analyzer-sdk';
import {EntityWithText} from '../../../../../../domain/model/ideas/entity-with-text';

export class EntityWithTextDocumentEntry implements DocumentEntry {
  public constructor(private readonly entity: EntityWithText, private readonly id) {
  }

  getContent(): string {
    return this.entity.text;
  }

  getContentType(): string {
    return 'application/html';
  }

  getId(): string {
    return this.id;
  }
}
