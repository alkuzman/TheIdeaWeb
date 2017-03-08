/**
 * Created by AKuzmanoski on 23/10/2016.
 */
export interface BaseEntity {
  id: number;
  creationDate: Date;
  lastModified: Date;
  type: string;
}
