import {NgModule} from "@angular/core";
import {ProtocolTransactionComponent} from "./protocol-transaction.component";
import {SharedModule} from "../../shared/shared.module";
import {IdeaModule} from "../idea/idea.module";
import {PriceRequestPhaseFieldsComponent} from "./components/price-request-phase/price-request-phase-forms/price-request-phase-fields/price-request-phase-fields.component";
import {PriceRequestPhaseFormComponent} from "./components/price-request-phase/price-request-phase-forms/price-request-phase-form/price-request-phase-form.component";
import {PriceRequestPhaseFormNewComponent} from "./components/price-request-phase/price-request-phase-forms/price-request-phase-form-new/price-request-phase-form-new.component";
import {CurrencyModule} from "../currency/components/currency.module";
import {SecurityModule} from "../security/security.module";
/**
 * Created by Viki on 2/19/2017.
 */


@NgModule({
  imports: [SharedModule, IdeaModule, CurrencyModule, SecurityModule],
  declarations: [PriceRequestPhaseFieldsComponent, PriceRequestPhaseFormComponent,
    PriceRequestPhaseFormNewComponent, ProtocolTransactionComponent],
  exports: [PriceRequestPhaseFieldsComponent, PriceRequestPhaseFormComponent, PriceRequestPhaseFormNewComponent,
    ProtocolTransactionComponent]
})
export class ProtocolTransactionModule {

}
