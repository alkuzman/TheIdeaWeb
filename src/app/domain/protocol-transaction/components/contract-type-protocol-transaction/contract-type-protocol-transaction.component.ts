import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatSnackBar} from "@angular/material";
import {ContractNegotiationDialogComponent} from "../dialogs/contract-negotiation-dialog/contract-negotiation-dialog.component";
import {Contract} from "../../../model/payment/contract";
import {PaymentRequestPhaseData} from "../../../model/security/data/payment-request-phase-data";

@Component({
    selector: 'ideal-contract-type-protocol-transaction',
    templateUrl: './contract-type-protocol-transaction.component.html',
    styleUrls: ['./contract-type-protocol-transaction.component.css']
})
export class ContractTypeProtocolTransactionComponent implements OnInit {

    @Input("currentStepNotice") currentStepNotice;
    @Input("lastContract") lastContract;
    @Input("buyer") buyer: boolean;
    @Output("dataReady") dataReady: EventEmitter<any> = new EventEmitter();
    @Output("abort") abort: EventEmitter<void> = new EventEmitter<void>();

    constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
    }

    ngOnInit() {
    }

    abortTransaction() {
        this.abort.emit();
    }

    continueTransaction() {
        if (this.currentStepNotice == null) {
            this.enterContractNegotiation();
        } else if (this.currentStepNotice.type === "ProtocolTransactionStepOneNotice") {
            this.enterContractNegotiation();
        } else if (this.currentStepNotice.type === "ProtocolTransactionStepTwoNotice") {
            this.enterContractNegotiation();
        } else if (this.currentStepNotice.type === "ProtocolTransactionStepThreeNotice") {
            this.dataReady.emit();
        } else if (this.currentStepNotice.type === "ProtocolTransactionStepFourNotice") {
            this.dataReady.emit();
        } else if (this.currentStepNotice.type === "ProtocolTransactionStepFiveNotice") {
            this.dataReady.emit();
        }
    }

    private enterContractNegotiation() {
        const dialogRef = this.dialog.open(ContractNegotiationDialogComponent);
        dialogRef.componentInstance.lastContract = this.lastContract;
        dialogRef.afterClosed().subscribe((contract: Contract) => {
            if (this.validateContract(contract)) {
                const data: PaymentRequestPhaseData = {};
                data.payment = contract;
                this.dataReady.emit(data);
            } else {
                this.snackBar.open("The contract can not be empty", null,
                    {
                        duration: 2000
                    });
            }
        });
    }

    private validateContract(contract: Contract): boolean {
        return contract != null &&
            contract.title != null && contract.title.trim() !== '' &&
            contract.text != null && contract.text.trim() !== '';
    }

}
