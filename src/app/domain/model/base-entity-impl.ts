import {BaseEntity} from "./base-entity";
/**
 * Created by Aleskandar Kuzmanoski on 10/10/2016.
 */
export abstract class BaseEntityImpl implements BaseEntity {
    public id: number;
    public creationDate: Date;
    public lastModified: Date;
    public name: string;
    public type: string;

    constructor() {
        this.type = this.constructor.name;
    }

    toString(): string {
        return "id: " + this.id + "\n" +
            "creationDate: " + this.creationDate + "\n" +
            "lastModified: " + this.lastModified + "\n" +
            "name: " + this.name + "\n" +
            "type: " + this.type;
    }
}
