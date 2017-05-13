import {Component, Input} from "@angular/core";
import {ProtocolTransactionHistoryStep} from "./protocol-transaction-history-step";
/**
 * Created by Viki on 4/8/2017.
 */


@Component({
    moduleId: module.id,
    selector: 'ideal-protocol-transaction-history-step-card',
    templateUrl: 'protocol-transaction-history-step-card.component.html'
})
export class ProtocolTransactionHistoryStepCardComponent {
    @Input("protocolTransactionHistoryStep") protocolTransactionHistoryStep: ProtocolTransactionHistoryStep;
    @Input("authenticatedUserEmail") authenticatedUserEmail: string;
}