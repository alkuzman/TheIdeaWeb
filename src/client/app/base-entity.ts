/**
 * Created by Aleskandar Kuzmanoski on 10/10/2016.
 */
export class BaseEntity extends Object{
  public id: number;
  public creationDate: Date;
  public lastModified: Date;

  toString():string {
    return "ID: " + this.id + "\nCREATION_DATE: " + this.creationDate + "\nLAST_MODIFIED: " + this.lastModified;
  }
}
