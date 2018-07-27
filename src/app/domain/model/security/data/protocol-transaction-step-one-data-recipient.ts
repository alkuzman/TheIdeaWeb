import {PaymentType} from '../../payment/payment_type';
import {DigitalGoodsType} from '../../ideas/digital_goods_type';
import {Payment} from '../../payment/payment';

export interface ProtocolTransactionStepOneDataRecipient {
  sessionKey?: CryptoKey;
  nonce?: string;
  identity?: string;
  paymentType?: PaymentType;
  goodsType?: DigitalGoodsType;
  bid?: Payment;
  tid?: number;
}
