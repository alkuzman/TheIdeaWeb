import {Component, Input, OnInit} from "@angular/core";
import {Idea} from "../model/ideas/idea";
import {ProtocolTransaction} from "../model/security/protocol-transaction";
import {ProtocolTransactionMessageOne} from "../model/security/messages/protocol-transaction-message-one";
import {ProtocolMessagesBuilderService} from "../../core/security-protocols/constructors/protocol-messages-builder.service";
import {MdDialog} from "@angular/material";
import {SecurityPasswordDialogComponent} from "../security/components/security-password-dialog/security-password-dialog.component";
/**
 * Created by Viki on 2/19/2017.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-protocol-transaction",
  templateUrl: "protocol-transaction.component.html"
})
export class ProtocolTransactionComponent implements OnInit {
  @Input("idea") idea: Idea;
  @Input("protocolTransaction") protocolTransaction: ProtocolTransaction;

  constructor(private protocolMessageConstructorService: ProtocolMessagesBuilderService,
              private dialog: MdDialog) {
  }

  ngOnInit() {
    if (this.protocolTransaction == null) {
      this.protocolTransaction = new ProtocolTransaction();
    }
  }

  stepOneReady(data: ProtocolTransactionMessageOne) {
    console.log(data);
    let dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
    dialogRef.afterClosed().subscribe((password: string) => {
      this.protocolMessageConstructorService.buildProtocolMessageOne(data, this.idea.owner, password);
    });
  }
}
