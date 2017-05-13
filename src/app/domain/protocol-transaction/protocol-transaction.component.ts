import {Component, Input, OnInit} from "@angular/core";
import {ProtocolMessagesBuilderService} from "../../core/security-protocols/constructors/protocol-messages-builder.service";
import {MdDialog} from "@angular/material";
import {SecurityPasswordDialogComponent} from "../security/components/security-password-dialog/security-password-dialog.component";
import {PriceRequestPhaseData} from "../model/security/data/price-request-phase-data";
import {Idea} from "../model/ideas/idea";
import {ProtocolMessagesReconstructionService} from "../../core/security-protocols/constructors/protocol-messages-reconstruction.service";
import {UserService} from "../services/user/user.service";
import {ProtocolSession} from "../model/security/protocol-session";
import {ProtocolTransactionStepNotice} from "../model/security/notices/protocol-transaction-step-notice";
import {ProtocolTransactionStepOneNotice} from "../model/security/notices/protocol-transaction-step-one-notice";
import {ProtocolTransactionStepTwoNotice} from "../model/security/notices/protocol-transaction-step-two-notice";
import {ProtocolTransactionHistoryStep} from "./components/protocol-transaction-history-step-card/protocol-transaction-history-step";
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
    private priceRequestPhaseData: PriceRequestPhaseData;
    private previousNotices: ProtocolTransactionHistoryStep[];

    constructor(private protocolMessageBuilderService: ProtocolMessagesBuilderService,
                private protocolMessageReconstructionService: ProtocolMessagesReconstructionService,
                private dialog: MdDialog, private userService: UserService) {
        this.previousNotices = [];
    }

    ngOnInit() {
        if (this.protocolSession == null) {
            if (this.currentStepNotice != null) {
                console.log(this.currentStepNotice);
                this.protocolSession = this.currentStepNotice.protocolSession;
            } else {
                this.protocolSession = new ProtocolSession();
                this.protocolSession.idea = new Idea();
            }
        }
        this.priceRequestPhaseData = {};
        this.processTransaction();
    }

    processTransaction() {
        if (this.currentStepNotice == null) {
            return;
        }
        let dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
        dialogRef.afterClosed().subscribe((password: string) => {
            let currentStep: ProtocolTransactionStepNotice<any> = this.currentStepNotice;
            while (currentStep != null) {
                let historyStep = {
                    messageType: currentStep.type,
                    originator: currentStep.originator.email,
                    when: currentStep.creationDate
                };
                this.previousNotices.push(historyStep);
                if (currentStep.originator.email == this.userService.getAuthenticatedUser().email) {
                    currentStep = currentStep.previousStepNotice;
                    continue;
                }
                if (currentStep.type == "ProtocolTransactionStepOneNotice") {
                    this.protocolMessageReconstructionService.constructProtocolMessageOne(currentStep.message, password, this.protocolSession)
                        .subscribe((data: PriceRequestPhaseData) => {
                            this.priceRequestPhaseData = data;
                            console.log(this.protocolSession);
                        });
                } else if (currentStep.type == "ProtocolTransactionStepTwoNotice") {
                    this.protocolMessageReconstructionService.constructProtocolMessageTwo(currentStep.message, password, this.protocolSession)
                        .subscribe((data: PriceRequestPhaseData) => {
                            this.priceRequestPhaseData = data;
                        });
                } else if (currentStep.type == "ProtocolTransactionStepThreeNotice") {
                    this.protocolMessageReconstructionService.constructProtocolMessageThree(currentStep.message, password, this.protocolSession)
                        .subscribe();
                }
                currentStep = currentStep.previousStepNotice;
            }
            this.previousNotices.reverse();
        });
    }

    ready(data: PriceRequestPhaseData) {
        let dialogRef = this.dialog.open(SecurityPasswordDialogComponent);
        dialogRef.afterClosed().subscribe((password: string) => {
            if (this.currentStepNotice == null) {
                this.protocolMessageBuilderService.buildProtocolMessageOne(data, password, this.priceRequestPhaseData, this.protocolSession, this.currentStepNotice);
            } else if (this.currentStepNotice.type == "ProtocolTransactionStepOneNotice"){
                this.protocolMessageBuilderService.buildProtocolMessageTwo(data, password, this.priceRequestPhaseData, this.protocolSession, this.currentStepNotice);
            } else if (this.currentStepNotice.type == "ProtocolTransactionStepTwoNotice") {
                if (data.price == this.priceRequestPhaseData.price) {
                    console.log("same prices");
                    this.protocolMessageBuilderService.buildProtocolMessageThree(data, password, this.priceRequestPhaseData, this.protocolSession, this.currentStepNotice);
                } else {
                    console.log("different prices");
                    this.protocolMessageBuilderService.buildProtocolMessageOne(data, password, this.priceRequestPhaseData, this.protocolSession, this.currentStepNotice);
                }
            }
        });
    }

    getAuthenticatedUserEmail() {
        return this.userService.getAuthenticatedUser().email;
    }
}
