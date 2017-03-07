import {Component, Input, OnInit} from "@angular/core";
import {ProtocolMessagesBuilderService} from "../../core/security-protocols/constructors/protocol-messages-builder.service";
import {MdDialog} from "@angular/material";
import {SecurityPasswordDialogComponent} from "../security/components/security-password-dialog/security-password-dialog.component";
import {BuyingTransaction} from "../model/security/buying-transaction";
import {Price} from "../model/helpers/price";
import {PriceRequestPhaseData} from "../model/security/data/price-request-phase-data";
import {Idea} from "../model/ideas/idea";
import {ProtocolTransactionMessageNumber} from "../model/enumerations/protocol-transaction-message-number";
import {ProtocolMessagesReconstructionService} from "../../core/security-protocols/constructors/protocol-messages-reconstruction.service";
import {ProtocolTransactionStep} from "../model/security/protocol-transaction-step";
/**
 * Created by Viki on 2/19/2017.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-protocol-transaction",
  templateUrl: "protocol-transaction.component.html"
})
export class ProtocolTransactionComponent implements OnInit {
  @Input("transaction")transaction: BuyingTransaction;

  constructor(private protocolMessageBuilderService: ProtocolMessagesBuilderService,
              private protocolMessageReconstructionService: ProtocolMessagesReconstructionService,
              private dialog: MdDialog) {
  }

  ngOnInit() {
    if (this.transaction == null) {
      this.transaction = new BuyingTransaction();
      this.transaction.idea = new Idea();
    }
    this.processTransaction();
  }

  processTransaction() {
    for (let step of this.transaction.messages) {
      switch (ProtocolTransactionMessageNumber[ProtocolTransactionMessageNumber[step.stepNumber]]) {
        case ProtocolTransactionMessageNumber[ProtocolTransactionMessageNumber.MONE]: {
          this.protocolMessageReconstructionService.constructProtocolMessageOne(step.stepMessage);
        }
      }
    }
  }

  ready(data: PriceRequestPhaseData) {
    console.log(data);
    let dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
    dialogRef.afterClosed().subscribe((password: string) => {
      this.protocolMessageBuilderService.buildProtocolMessageOne(data, this.transaction.idea, password);
    });
  }
}
