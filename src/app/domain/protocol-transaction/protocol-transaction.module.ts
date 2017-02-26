import {NgModule} from "@angular/core";
import {ProtocolTransactionComponent} from "./protocol-transaction.component";
import {SharedModule} from "../../shared/shared.module";
import {IdeaModule} from "../idea/idea.module";
import {StepOneFieldsComponent} from "./components/steps/step-one/step-one-forms/step-one-fields/step-one-fields.component";
import {StepOneFormComponent} from "./components/steps/step-one/step-one-forms/step-one-form/step-one-form.component";
import {StepOneFormNewComponent} from "./components/steps/step-one/step-one-forms/step-one-form-new/step-one-form-new.component";
import {CurrencyModule} from "../currency/components/currency.module";
/**
 * Created by Viki on 2/19/2017.
 */


@NgModule({
  imports: [SharedModule, IdeaModule, CurrencyModule],
  declarations: [StepOneFieldsComponent, StepOneFormComponent,
    StepOneFormNewComponent, ProtocolTransactionComponent],
  exports: [StepOneFieldsComponent, StepOneFormComponent, StepOneFormNewComponent, ProtocolTransactionComponent]
})
export class ProtocolTransactionModule {

}
