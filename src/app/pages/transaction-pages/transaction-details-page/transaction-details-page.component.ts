import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BuyingTransaction} from "../../../domain/model/security/buying-transaction";
/**
 * Created by Viki on 3/3/2017.
 */


@Component({
  moduleId: module.id,
  selector: 'ideal-transaction-details-page',
  templateUrl: 'transaction-details-page.component.html'
})
export class TransactionDetailsPageComponent implements OnInit {
  private transaction: BuyingTransaction;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: {transaction: BuyingTransaction}) => {
      this.transaction = data.transaction;
    });
  }

}
