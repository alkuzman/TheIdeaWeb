import {Price} from "../../payment/price";
import {Payment} from "../../payment/payment";
/**
 * Created by Viki on 3/7/2017.
 */


export interface PaymentRequestPhaseData {
    payment?: Payment;
    key?: CryptoKey;
    nonce?: number;
    otherParty?: string;
    tID?: number;
    productID?: number;
}