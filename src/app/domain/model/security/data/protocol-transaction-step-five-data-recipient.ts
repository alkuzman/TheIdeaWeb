
import {Payment} from "../../payment/payment";
import {Epoid} from "./epoid";
import {Epo} from "./epo";

export interface ProtocolTransactionStepFiveDataRecipient {
    nonce?: number,
    identity?: string,
    productId?: number,
    payment?: Payment,
    merchant?: string,
    epoid?: Epoid
    signature?: string;
    epo?: Epo;
}