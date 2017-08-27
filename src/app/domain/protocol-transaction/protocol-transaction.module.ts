import {NgModule} from "@angular/core";
import {ProtocolTransactionComponent} from "./protocol-transaction.component";
import {SharedModule} from "../../shared/shared.module";
import {IdeaModule} from "../idea/idea.module";
import {PriceRequestPhaseFieldsComponent} from "./components/price-request-phase/price-request-phase-forms/price-request-phase-fields/price-request-phase-fields.component";
import {PriceRequestPhaseFormComponent} from "./components/price-request-phase/price-request-phase-forms/price-request-phase-form/price-request-phase-form.component";
import {PriceRequestPhaseFormNewComponent} from "./components/price-request-phase/price-request-phase-forms/price-request-phase-form-new/price-request-phase-form-new.component";
import {CurrencyModule} from "../currency/components/currency.module";
import {SecurityModule} from "../security/security.module";
import {ProtocolTransactionHistoryStepMessagePipe} from "./pipes/protocol-transaction-history-step-message.pipe";
import {ProtocolTransactionHistoryStepCardComponent} from "./components/protocol-transaction-history-step-card/protocol-transaction-history-step-card.component";
import {CardInformationDialogComponent} from './components/dialogs/card-information-dialog/card-information-dialog.component';
import { PaypalAccountInformationDialogComponent } from './components/dialogs/paypal-account-information-dialog/paypal-account-information-dialog.component';
import {ProtocolTransactionCurrentStepMessagePipe} from "./pipes/protocol-transaction-current-step-message.pipe";
import { PaymentTypeChoiceDialogComponent } from './components/dialogs/payment-type-choice-dialog/payment-type-choice-dialog.component';
import { ProtocolTransactionHistoryComponent } from './components/protocol-transaction-history/protocol-transaction-history.component';
import { PriceNegotiationDialogComponent } from './components/dialogs/price-negotiation-dialog/price-negotiation-dialog.component';
import { MoneyTypeProtocolTransactionComponent } from './components/money-type-protocol-transaction/money-type-protocol-transaction.component';
import { ContractTypeProtocolTransactionComponent } from './components/contract-type-protocol-transaction/contract-type-protocol-transaction.component';
import { ContractNegotiationDialogComponent } from './components/dialogs/contract-negotiation-dialog/contract-negotiation-dialog.component';
import { ProtocolTransactionFinishedComponent } from './components/protocol-transaction-finished/protocol-transaction-finished.component';

@NgModule({
    imports: [SharedModule, IdeaModule, CurrencyModule, SecurityModule],
    declarations: [PriceRequestPhaseFieldsComponent, PriceRequestPhaseFormComponent,
        PriceRequestPhaseFormNewComponent, ProtocolTransactionComponent, ProtocolTransactionHistoryStepMessagePipe,
        ProtocolTransactionHistoryStepCardComponent,
        CardInformationDialogComponent,
        PaypalAccountInformationDialogComponent, ProtocolTransactionCurrentStepMessagePipe,
        PaymentTypeChoiceDialogComponent,
        ProtocolTransactionHistoryComponent,
        PriceNegotiationDialogComponent,
        MoneyTypeProtocolTransactionComponent,
        ContractTypeProtocolTransactionComponent,
        ContractNegotiationDialogComponent,
        ProtocolTransactionFinishedComponent],
    exports: [PriceRequestPhaseFieldsComponent, PriceRequestPhaseFormComponent, PriceRequestPhaseFormNewComponent,
        ProtocolTransactionComponent, ProtocolTransactionHistoryStepMessagePipe,
        ProtocolTransactionHistoryStepCardComponent,
        CardInformationDialogComponent,
        PaypalAccountInformationDialogComponent, ProtocolTransactionCurrentStepMessagePipe,
        ProtocolTransactionFinishedComponent],
    entryComponents: [CardInformationDialogComponent, PaypalAccountInformationDialogComponent,
        PaymentTypeChoiceDialogComponent, PriceNegotiationDialogComponent, ContractNegotiationDialogComponent]
})
export class ProtocolTransactionModule {

}
