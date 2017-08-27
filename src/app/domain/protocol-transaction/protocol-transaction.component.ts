import {Component, Input, OnInit} from "@angular/core";
import {ProtocolMessagesBuilderService} from "../../core/security-protocols/constructors/protocol-messages-builder.service";
import {MatDialog} from "@angular/material";
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
import {Subject} from "rxjs/Subject";
import {PaymentTypeChoiceDialogComponent} from "./components/dialogs/payment-type-choice-dialog/payment-type-choice-dialog.component";

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

    PaymentType = PaymentType;

    priceRequestPhaseData: PaymentRequestPhaseData;
    previousNotices: ProtocolTransactionHistoryStep[];
    previousNoticesData: PreviousNoticesData = {};

    paymentSubject: Subject<Payment> = new Subject<Payment>();
    lastPayment: Payment;
    paymentType: PaymentType;

    protocolSessionSubject: Subject<ProtocolSession> = new Subject<ProtocolSession>();
    finishInitializationSubject: Subject<boolean> = new Subject();
    finishInitializing = false;

  constructor(private protocolMessageBuilderService: ProtocolMessagesBuilderService,
              private protocolMessageReconstructionService: ProtocolMessagesReconstructionService,
              private dialog: MatDialog, private userService: UserService) {
    this.previousNotices = [];
  }

    ngOnInit() {
        if (this.currentStepNotice == null) {
            const dialogRef = this.dialog.open(PaymentTypeChoiceDialogComponent);
            dialogRef.afterClosed().subscribe((choice: PaymentType) => {
                this.paymentType = choice;
            })
        }
        if (this.protocolSession == null) {
            if (this.currentStepNotice != null) {
                this.protocolSession = this.currentStepNotice.protocolSession;
            } else {
                this.protocolSession = new ProtocolSession();
                this.protocolSession.digitalGoods = new Idea();
            }
        }
        this.priceRequestPhaseData = {};

        // Get the last payment, so you can show it to the user
        this.paymentSubject.asObservable().subscribe((payment: Payment) => {
            this.lastPayment = payment;
            this.paymentType = this.lastPayment.type === "Money" ? PaymentType.Money : PaymentType.Contract;
        });

        // Listen if protocol session has been changed
        this.protocolSessionSubject.asObservable().subscribe((protocolSession: ProtocolSession) => {
            this.protocolSession = protocolSession;
        });

        this.finishInitializationSubject.asObservable().subscribe((finished: boolean) => {
            this.finishInitializing = finished;
        });

        this.processTransaction();
    }

    processTransaction() {
        if (this.currentStepNotice == null) {
            this.finishInitializing = true;
            return;
        }
        const dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
        dialogRef.afterClosed().subscribe((password: string) => {

            const currentStep: ProtocolTransactionStepNotice<any> = this.currentStepNotice;
            const array = this.createArrayOfNotices(currentStep);
            this.protocolMessageReconstructionService.reconstructMessages(array, password,
                this.previousNotices, this.previousNoticesData, this.protocolSession,
                this.protocolSessionSubject, this.finishInitializationSubject, this.paymentSubject)
                .subscribe((value) => {
                    console.log(value);
                });
        });
    }

    private createArrayOfNotices(currentStep: ProtocolTransactionStepNotice<any>): ProtocolTransactionStepNotice<any>[] {
        const array: ProtocolTransactionStepNotice<any>[] = [];
        while (currentStep != null) {
            array.push(currentStep);
            currentStep = currentStep.previousStepNotice;
        }
        return array;
    }

    abort() {
        // Todo: Implement aborting protocol
    }

    ready(data: any) {
        const dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
        dialogRef.afterClosed().subscribe((password: string) => {

            if (this.currentStepNotice == null) {
                this.protocolMessageBuilderService.buildProtocolMessageOne(data, password, this.priceRequestPhaseData,
                    this.protocolSession, this.currentStepNotice, this.paymentType, DigitalGoodsType.Solution);
            } else if (this.currentStepNotice.type === "ProtocolTransactionStepOneNotice") {
                this.protocolMessageBuilderService.buildProtocolMessageTwo(data, password,
                    this.previousNoticesData["ProtocolTransactionStepOneDataRecipient"], this.protocolSession, this.currentStepNotice);
            } else if (this.currentStepNotice.type === "ProtocolTransactionStepTwoNotice") {
                if (data.payment === this.lastPayment) {
                    this.protocolMessageBuilderService.buildProtocolMessageThree(password,
                        this.previousNoticesData["ProtocolTransactionStepTwoDataRecipient"], this.protocolSession, this.currentStepNotice);
                } else {
                    this.protocolMessageBuilderService.buildProtocolMessageOne(data, password,
                        this.previousNoticesData["ProtocolTransactionStepTwoDataRecipient"],
                        this.protocolSession, this.currentStepNotice, this.paymentType, DigitalGoodsType.Solution);
                }
            } else if (this.currentStepNotice.type === "ProtocolTransactionStepThreeNotice") {
                this.protocolMessageBuilderService.buildProtocolMessageFour(password, this.protocolSession,
                    this.currentStepNotice, this.previousNoticesData);
            } else if (this.currentStepNotice.type === "ProtocolTransactionStepFourNotice") {
                this.protocolMessageBuilderService.buildProtocolMessageFive(data, password, this.protocolSession,
                    this.currentStepNotice, this.previousNoticesData);
            } else if (this.currentStepNotice.type === "ProtocolTransactionStepFiveNotice") {
                this.protocolMessageBuilderService.buildProtocolMessageSix(data, password, this.protocolSession,
                    this.currentStepNotice, this.previousNoticesData);
            }
        });
    }

    getAuthenticatedUserEmail(): string {
        return this.userService.getAuthenticatedUser().email;
    }
}
