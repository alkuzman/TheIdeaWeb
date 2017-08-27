

import {BaseEntity} from "../base-entity";

export interface Payment extends BaseEntity {

    getText(): string;

    constructObject(text: string): void;
}