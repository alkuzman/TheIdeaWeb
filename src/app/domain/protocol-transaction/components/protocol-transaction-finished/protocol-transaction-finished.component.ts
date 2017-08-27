import {Component, Input, OnInit} from '@angular/core';
import {RedirectService} from "../../../../core/navigation/redirect.service";

@Component({
    selector: 'ideal-protocol-transaction-finished',
    templateUrl: './protocol-transaction-finished.component.html',
    styleUrls: ['./protocol-transaction-finished.component.css']
})
export class ProtocolTransactionFinishedComponent implements OnInit {

    @Input("owner") isOwner: boolean;
    @Input("goodsId") goodsId: number;
    @Input("outcome") outcome: string;

    constructor(private redirectService: RedirectService) {
    }

    ngOnInit() {
    }

    checkOutGoods() {
        this.redirectService.updateIdea(this.goodsId);
    }

}
