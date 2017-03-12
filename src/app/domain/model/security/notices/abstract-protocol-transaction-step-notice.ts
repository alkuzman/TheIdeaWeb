import {ProtocolTransactionStepNotice} from "./protocol-transaction-step-notice";
import {AbstractNotice} from "../../sharing/abstract-notice";
import {Agent} from "../../authentication/agent";
import {Idea} from "../../ideas/idea";
import {ProtocolSession} from "../protocol-session";
/**
 * Created by Viki on 3/9/2017.
 */


export abstract class AbstractProtocolTransactionStepNotice<T extends ProtocolTransactionStepNotice<T>> extends AbstractNotice implements ProtocolTransactionStepNotice<T> {
    public message: string;
    public originator: Agent;
    public previousStepNotice: T;
    public protocolSession: ProtocolSession;
    public activated: boolean;


    getMessage(): string {
        return this.message;
    }

    setMessage(message: string): void {
        this.message = message;
    }

    getOriginator(): Agent {
        return this.originator;
    }

    setOriginator(originator: Agent): void {
        this.originator = originator;
    }

    getPreviousStepNotice(): T {
        return this.previousStepNotice;
    }

    setPreviousStepNotice(previousStepNotice: T): void {
        this.previousStepNotice = previousStepNotice;
    }

    getProtocolSession(): ProtocolSession {
        return this.protocolSession;
    }

    setProtocolSession(protocolSession: ProtocolSession): void {
        this.protocolSession = protocolSession;
    }

    isActivated(): boolean {
        return this.activated;
    }

    setActivated(activated: boolean): void {
        this.activated = activated;
    }
}