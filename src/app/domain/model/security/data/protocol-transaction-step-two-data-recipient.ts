

import {Payment} from "../../payment/payment";

export interface ProtocolTransactionStepTwoDataRecipient {
    productId?: number;
    payment?: Payment;
    nonce?: string;
    tid?: number;
}