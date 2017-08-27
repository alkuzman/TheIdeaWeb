
import {Epoid} from "./epoid";
import {Payment} from "../../payment/payment";

export interface ProtocolTransactionStepFiveDataOriginator {
    nonce?: number,
    identity?: string,
    productId?: number,
    payment?: Payment,
    merchant?: string,
    epoid?: Epoid
}