import {BaseEntity} from "../base-entity";
import {Recipient} from "./recipient";
/**
 * Created by Viki on 3/9/2017.
 */


export interface Notice extends BaseEntity{

    recipients: Recipient[];
}