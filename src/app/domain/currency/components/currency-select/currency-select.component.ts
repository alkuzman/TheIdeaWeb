import {Component, Input, OnInit} from "@angular/core";
import {CurrencyService} from "../../../services/currency/currency.service";
import {Currency} from "../../../model/helpers/currency";
import {MakeProvider, AbstractValueAccessor} from "../../../../shared/abstract-value-accessor";
/**
 * Created by Viki on 2/21/2017.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-currency-select",
  templateUrl: "currency-select.component.html",
  providers: [MakeProvider(CurrencySelectComponent)]
})
export class CurrencySelectComponent extends AbstractValueAccessor<Currency> implements OnInit {

  @Input("placeholder") placeholder: string;
  currencies: Currency[];

  constructor(private currencyService: CurrencyService) {
    super(new Currency());
  }

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((currencies: Currency[]) => {
      this.currencies = currencies;
    })
  }

}
