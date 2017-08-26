

import {Payment} from "../../payment/payment";

export interface ProtocolTransactionStepTwoDataOriginator {
    productId?: number;
    payment?: Payment;
    nonce?: number;
    tid?: number;
}