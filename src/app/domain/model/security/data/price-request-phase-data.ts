import {Price} from "../../helpers/price";
/**
 * Created by Viki on 3/7/2017.
 */


export interface PriceRequestPhaseData {
    price?: Price;
    key?: CryptoKey;
    nonce?: number;
    otherParty?: string;
    tID?: number;
    productID?: number;
}