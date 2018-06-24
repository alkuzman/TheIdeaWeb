import {DocumentEntry} from '@klupps/analyzer-sdk';
import {TitledEntity} from '../../../../../../domain/model/ideas/titled-entity';

export class TitledEntityDocumentEntry implements DocumentEntry {
  public constructor(private readonly entity: TitledEntity, private readonly id) {
  }

  getContent(): string {
    return this.entity.title;
  }

  getContentType(): string {
    return 'text/plain';
  }

  getId(): string {
    return this.id;
  }
}
