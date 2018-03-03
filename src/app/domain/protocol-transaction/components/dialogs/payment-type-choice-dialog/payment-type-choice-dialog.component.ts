import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {PaymentType} from "../../../../model/payment/payment_type";

@Component({
    selector: 'ideal-payment-type-choice-dialog',
    templateUrl: './payment-type-choice-dialog.component.html',
    styleUrls: ['./payment-type-choice-dialog.component.css']
})
export class PaymentTypeChoiceDialogComponent implements OnInit {

    choice: PaymentType;
    PaymentType = PaymentType;
    keys(): Array<string> {
        const keys = Object.keys(PaymentType);
        return keys.slice(keys.length / 2, keys.length);
    }

    constructor(private dialogRef: MatDialogRef<PaymentTypeChoiceDialogComponent>) {
    }

    ngOnInit() {
    }

    closeDialog() {
        this.dialogRef.close(PaymentType[this.choice]);
    }

}
