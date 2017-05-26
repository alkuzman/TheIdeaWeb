import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProtocolTransactionStepNotice} from "../../../domain/model/security/notices/protocol-transaction-step-notice";
/**
 * Created by Viki on 3/3/2017.
 */


@Component({
  moduleId: module.id,
  selector: 'ideal-transaction-details-page',
  templateUrl: 'transaction-details-page.component.html'
})
export class TransactionDetailsPageComponent implements OnInit {
  currentNotice: ProtocolTransactionStepNotice<any>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: {notice: ProtocolTransactionStepNotice<any>}) => {
      this.currentNotice = data.notice;
    });
  }

}
