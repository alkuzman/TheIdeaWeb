import {Properties} from "../../../shared/utils/properties";
/**
 * Created by Viki on 3/2/2017.
 */


export interface NoticeFilterProperties extends Properties {
    type?: string;
    limit?: string;
    offset?: string;
    query?: string;
}