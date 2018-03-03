import {Component, Input, OnInit} from '@angular/core';
import {ProtocolTransactionHistoryStep} from "../protocol-transaction-history-step-card/protocol-transaction-history-step";

@Component({
  selector: 'ideal-protocol-transaction-history',
  templateUrl: './protocol-transaction-history.component.html',
  styleUrls: ['./protocol-transaction-history.component.css']
})
export class ProtocolTransactionHistoryComponent implements OnInit {

  @Input("previousNotices") previousNotices: ProtocolTransactionHistoryStep[];
  @Input("authenticatedUserEmail") authenticatedUserEmail: string;
  constructor() { }

  ngOnInit() {
  }

}
