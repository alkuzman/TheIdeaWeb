import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {Money} from "../../../../model/payment/money";

@Component({
    selector: 'ideal-price-negotiation-dialog',
    templateUrl: './price-negotiation-dialog.component.html',
    styleUrls: ['./price-negotiation-dialog.component.css']
})
export class PriceNegotiationDialogComponent implements OnInit {

    price: Money;
    lastPrice: Money;

    constructor(private dialogRef: MatDialogRef<PriceNegotiationDialogComponent>) {
    }

    ngOnInit() {
        this.price = new Money();
    }

    closeDialog() {
        this.dialogRef.close(this.price);
    }

    acceptPrice() {
        this.price = this.lastPrice;
        this.closeDialog();
    }

}
