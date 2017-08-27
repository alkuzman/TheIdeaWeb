import {Payment} from "../../payment/payment";
import {PaymentType} from "../../payment/payment_type";
import {DigitalGoodsType} from "../../ideas/digital_goods_type";
/**
 * Created by Viki on 3/7/2017.
 */


export interface PaymentRequestPhaseData {
    payment?: Payment;
    key?: CryptoKey;
    nonce?: string;
    otherParty?: string;
    tID?: number;
    productID?: number;
    paymentType?: PaymentType,
    goodsType?: DigitalGoodsType
}