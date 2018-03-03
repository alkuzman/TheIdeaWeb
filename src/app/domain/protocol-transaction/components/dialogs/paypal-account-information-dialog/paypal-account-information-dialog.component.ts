import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
    selector: 'ideal-paypal-account-information-dialog',
    templateUrl: './paypal-account-information-dialog.component.html',
    styleUrls: ['./paypal-account-information-dialog.component.css']
})
export class PaypalAccountInformationDialogComponent implements OnInit {

    paypalAccount: string;

    constructor(private dialogRef: MatDialogRef<PaypalAccountInformationDialogComponent>) {
    }

    ngOnInit() {
    }

    public closeDialog() {
        this.dialogRef.close(this.paypalAccount);
    }
}
