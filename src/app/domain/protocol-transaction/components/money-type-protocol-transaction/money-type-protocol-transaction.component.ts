import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PriceNegotiationDialogComponent} from "../dialogs/price-negotiation-dialog/price-negotiation-dialog.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {PaymentRequestPhaseData} from "../../../model/security/data/payment-request-phase-data";
import {Money} from "../../../model/payment/money";
import {CardInformationDialogComponent} from "../dialogs/card-information-dialog/card-information-dialog.component";
import {CardInformation} from "../../../model/security/data/card-information";
import {PaypalAccountInformationDialogComponent} from "../dialogs/paypal-account-information-dialog/paypal-account-information-dialog.component";

@Component({
    selector: 'ideal-money-type-protocol-transaction',
    templateUrl: './money-type-protocol-transaction.component.html',
    styleUrls: ['./money-type-protocol-transaction.component.css']
})
export class MoneyTypeProtocolTransactionComponent implements OnInit {

    @Input("currentStepNotice") currentStepNotice;
    @Input("lastPrice") lastPrice: Money;
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
            this.enterPriceNegotiation();
        } else if (this.currentStepNotice.type === "ProtocolTransactionStepOneNotice") {
            this.enterPriceNegotiation();
        } else if (this.currentStepNotice.type === "ProtocolTransactionStepTwoNotice") {
            this.enterPriceNegotiation();
        } else if (this.currentStepNotice.type === "ProtocolTransactionStepThreeNotice") {
            this.dataReady.emit();
        } else if (this.currentStepNotice.type === "ProtocolTransactionStepFourNotice") {
            this.enterCardInformationDetails();
        } else if (this.currentStepNotice.type === "ProtocolTransactionStepFiveNotice") {
            this.enterPaypalAccount();
        }
    }

    enterPriceNegotiation() {
        const dialogRef = this.dialog.open(PriceNegotiationDialogComponent, {
            width: "50%"
        });
        dialogRef.componentInstance.lastPrice = this.lastPrice;

        dialogRef.afterClosed().subscribe((price: Money) => {
            if (this.validatePrice(price)) {
                let data: PaymentRequestPhaseData = {};
                data.payment = price;
                this.dataReady.emit(data);
            } else {
                this.snackBar.open("The price you entered is not valid. Please try again", null,
                    {
                        duration: 2000
                    });
            }
        });
    }

    private validatePrice(price: Money): boolean {
        return !(price == null || price.value == null || price.value < 0 || price.currency.value == null);
    }

    enterCardInformationDetails() {
      const dialogRef = this.dialog.open(CardInformationDialogComponent);
        dialogRef.afterClosed().subscribe((cardInformation: CardInformation) => {
            this.dataReady.emit(cardInformation);
        });
    }

    enterPaypalAccount() {
      const dialogRef = this.dialog.open(PaypalAccountInformationDialogComponent);
        dialogRef.afterClosed().subscribe((payPalAccount: string) => {
            this.dataReady.emit(payPalAccount);
        })
    }
}
