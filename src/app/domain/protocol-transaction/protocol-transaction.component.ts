import {Component, Input, OnInit} from "@angular/core";
import {ProtocolMessagesBuilderService} from "../../core/security-protocols/constructors/protocol-messages-builder.service";
import {MdDialog} from "@angular/material";
import {SecurityPasswordDialogComponent} from "../security/components/security-password-dialog/security-password-dialog.component";
import {PaymentRequestPhaseData} from "../model/security/data/payment-request-phase-data";
import {Idea} from "../model/ideas/idea";
import {ProtocolMessagesReconstructionService} from "../../core/security-protocols/constructors/protocol-messages-reconstruction.service";
import {UserService} from "../services/user/user.service";
import {ProtocolSession} from "../model/security/protocol-session";
import {ProtocolTransactionStepNotice} from "../model/security/notices/protocol-transaction-step-notice";
import {ProtocolTransactionStepOneNotice} from "../model/security/notices/protocol-transaction-step-one-notice";
import {ProtocolTransactionStepTwoNotice} from "../model/security/notices/protocol-transaction-step-two-notice";
import {ProtocolTransactionHistoryStep} from "./components/protocol-transaction-history-step-card/protocol-transaction-history-step";
import {PaymentType} from "../model/payment/payment_type";
import {DigitalGoodsType} from "../model/ideas/digital_goods_type";
import {PreviousNoticesData} from "../model/security/data/previous-notices-data";
import {Payment} from "../model/payment/payment";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

/**
 * Created by Viki on 2/19/2017.
 */

@Component({
    moduleId: module.id,
    selector: "ideal-protocol-transaction",
    templateUrl: "protocol-transaction.component.html"
})
export class ProtocolTransactionComponent implements OnInit {
    @Input("protocolSession") protocolSession: ProtocolSession;
    @Input("currentStepNotice") currentStepNotice;
    priceRequestPhaseData: PaymentRequestPhaseData;
    previousNotices: ProtocolTransactionHistoryStep[];
    previousNoticesData: PreviousNoticesData = {};
    paymentSubject: Subject<Payment> = new Subject<Payment>();
    lastPayment: Payment;
    pricePhase: boolean = true;
    abort: boolean = true;

    constructor(private protocolMessageBuilderService: ProtocolMessagesBuilderService,
                private protocolMessageReconstructionService: ProtocolMessagesReconstructionService,
                private dialog: MdDialog, private userService: UserService) {
        this.previousNotices = [];
    }

    ngOnInit() {
        if (this.protocolSession == null) {
            if (this.currentStepNotice != null) {
                this.protocolSession = this.currentStepNotice.protocolSession;
            } else {
                this.protocolSession = new ProtocolSession();
                this.protocolSession.idea = new Idea();
            }
        }
        this.priceRequestPhaseData = {};
        this.paymentSubject.asObservable().subscribe((payment: Payment) => {
            this.lastPayment = payment;
        });
        this.processTransaction();
    }

    processTransaction() {
        if (this.currentStepNotice == null) {
            return;
        }
        let dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
        dialogRef.afterClosed().subscribe((password: string) => {

            let currentStep: ProtocolTransactionStepNotice<any> = this.currentStepNotice;
            const array = this.createArrayOfNotices(currentStep);
            this.protocolMessageReconstructionService.reconstructMessages(array, password,
                this.previousNotices, this.previousNoticesData, this.protocolSession, this.paymentSubject)
                .subscribe((value) => {
                    console.log(value);
                });

            this.pricePhase = this.checkIfItIsPriceNegotiationPhase();
        });
    }

    private checkIfItIsPriceNegotiationPhase(): boolean {
        if (this.currentStepNotice.type === "ProtocolTransactionStepOneNotice" ||
            this.currentStepNotice.type === "ProtocolTransactionStepTwoNotice") {
            return true;
        }
        return false;
    }

    private createArrayOfNotices(currentStep: ProtocolTransactionStepNotice<any>): ProtocolTransactionStepNotice<any>[] {
        let array: ProtocolTransactionStepNotice<any>[] = [];
        while(currentStep != null) {
            array.push(currentStep);
            currentStep = currentStep.previousStepNotice;
        }
        return array;
    }

    ready(data: any) {
        let dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
        dialogRef.afterClosed().subscribe((password: string) => {
            console.log(password);
            if (this.currentStepNotice == null) {
                this.protocolMessageBuilderService.buildProtocolMessageOne(data, password, this.priceRequestPhaseData,
                    this.protocolSession, this.currentStepNotice, PaymentType.Price, DigitalGoodsType.Solution);
            } else if (this.currentStepNotice.type == "ProtocolTransactionStepOneNotice") {
                this.protocolMessageBuilderService.buildProtocolMessageTwo(data, password,
                    this.previousNoticesData["ProtocolTransactionStepOneDataRecipient"], this.protocolSession, this.currentStepNotice);
            } else if (this.currentStepNotice.type == "ProtocolTransactionStepTwoNotice") {
                if (data.payment == this.lastPayment) {
                    console.log("same prices");
                    this.protocolMessageBuilderService.buildProtocolMessageThree(password,
                        this.previousNoticesData["ProtocolTransactionStepTwoDataRecipient"], this.protocolSession, this.currentStepNotice);
                } else {
                    console.log("different prices");
                    this.protocolMessageBuilderService.buildProtocolMessageOne(data, password,
                        this.previousNoticesData["ProtocolTransactionStepTwoDataRecipient"],
                        this.protocolSession, this.currentStepNotice, PaymentType.Price, DigitalGoodsType.Solution);
                }
            } else if (this.currentStepNotice.type == "ProtocolTransactionStepThreeNotice") {
                this.protocolMessageBuilderService.buildProtocolMessageFour(data, password, this.protocolSession, this.currentStepNotice);
            }
        });
    }

    getAuthenticatedUserEmail() {
        return this.userService.getAuthenticatedUser().email;
    }
}
