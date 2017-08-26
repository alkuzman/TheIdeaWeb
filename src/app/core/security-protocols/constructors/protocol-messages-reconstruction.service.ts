import {Injectable} from "@angular/core";
import {SecurityProfile} from "../../../domain/model/security/security-profile";
import {JwtSecurityContext} from "../../authentication/jwt/jwt-security-context.service";
import {CryptographicOperations} from "../cryptographic-operations/cryptographic-operations";
import {HelperService} from "../helper.service";
import {KeysService} from "../keys/keys.service";
import {ParserPemService} from "../parsers/parser-pem.service";
import {CertificateService} from "../../../domain/services/certificate/certificate.service";
import Certificate from "pkijs/src/Certificate";
import {Price} from "../../../domain/model/payment/price";
import {Observable} from "rxjs";
import {ProtocolSession} from "../../../domain/model/security/protocol-session";
import {UserService} from "../../../domain/services/user/user.service";
import {SimpleSecurityProfile} from "../../../domain/model/security/simple-security-profile";
import {SecurityProfileConstructorService} from "./security-profile-constructor.service";
import {SimpleCryptographicOperations} from "../cryptographic-operations/simple-cryptographic-operations";
import {AlgorithmService} from "../algorithms/algorithms.service";
import {DigitalGoodsType} from "../../../domain/model/ideas/digital_goods_type";
import {PaymentType} from "../../../domain/model/payment/payment_type";
import {Contract} from "../../../domain/model/payment/contract";
import {Agent} from "../../../domain/model/authentication/agent";
import {ProtocolTransactionStepOneDataOriginator} from "../../../domain/model/security/data/protocol-transaction-step-one-data-originator";
import {ProtocolTransactionStepOneDataRecipient} from "../../../domain/model/security/data/protocol-transaction-step-one-data-recipient";
import {ProtocolTransactionStepNotice} from "../../../domain/model/security/notices/protocol-transaction-step-notice";
import {ProtocolTransactionHistoryStep} from "../../../domain/protocol-transaction/components/protocol-transaction-history-step-card/protocol-transaction-history-step";
import {PreviousNoticesData} from "../../../domain/model/security/data/previous-notices-data";
import {ProtocolTransactionStepTwoDataRecipient} from "../../../domain/model/security/data/protocol-transaction-step-two-data-recipient";
import {ProtocolTransactionStepTwoDataOriginator} from "../../../domain/model/security/data/protocol-transaction-step-two-data-originator";
import {ProtocolTransactionStepThreeDataRecipient} from "../../../domain/model/security/data/protocol-transaction-step-three-data-recipient";
import {ProtocolTransactionStepThreeDataOriginator} from "../../../domain/model/security/data/protocol-transaction-step-three-data-originator";
import {Payment} from "../../../domain/model/payment/payment";
import {Subject} from "rxjs/Subject";
import {createUrlResolverWithoutPackagePrefix} from "@angular/compiler";

/**
 * Created by Viki on 3/1/2017.
 */


@Injectable()
export class ProtocolMessagesReconstructionService {

    private securityProfile: SecurityProfile;

    constructor(private securityContext: JwtSecurityContext,
                private cryptographicOperations: CryptographicOperations,
                private simpleCryptographicOperations: SimpleCryptographicOperations,
                private helper: HelperService,
                private algorithmService: AlgorithmService,
                private keysService: KeysService, private pemParser: ParserPemService,
                private certificateService: CertificateService,
                private securityProfileConstructor: SecurityProfileConstructorService,
                private userService: UserService) {
        this.initializeSecurityProfile();
    }

    public reconstructMessages(array: ProtocolTransactionStepNotice<any>[], password: string,
                                previousNotices: ProtocolTransactionHistoryStep[],
                                previousNoticesData: PreviousNoticesData,
                                protocolSession: ProtocolSession,
                                lastPaymentSubject: Subject<Payment>): Observable<PreviousNoticesData> {

        return this.reconstructProtocolMessage(array.pop(), password, previousNotices, previousNoticesData, protocolSession,
            lastPaymentSubject).expand((currentStep: ProtocolTransactionStepNotice<any>) => {
                if (array.length > 0) {
                    return this.reconstructProtocolMessage(array.pop(), password, previousNotices, previousNoticesData,
                        protocolSession, lastPaymentSubject);
                } else {
                    return Observable.empty();
                }
            });
    }

    private reconstructProtocolMessage(currentStep: ProtocolTransactionStepNotice<any>, password: string,
                                        previousNotices: ProtocolTransactionHistoryStep[],
                                        previousNoticesData: PreviousNoticesData,
                                        protocolSession: ProtocolSession,
                                        lastPaymentSubject: Subject<Payment>): Observable<PreviousNoticesData> {
        const historyStep = {
            messageType: currentStep.type,
            originator: currentStep.originator.email,
            when: currentStep.creationDate
        };
        previousNotices.push(historyStep);

        return Observable.create((observer) => {

            // Processing Protocol transaction steps
            if (currentStep.type == "ProtocolTransactionStepOneNotice") {
                // Check if the authenticated user is originator or recipient of the message
                if (currentStep.originator.email == this.userService.getAuthenticatedUser().email) {
                    this.constructProtocolMessageOneForOriginator(currentStep.message, password, protocolSession)
                        .subscribe((data: ProtocolTransactionStepOneDataOriginator) => {
                            previousNoticesData["ProtocolTransactionStepOneDataOriginator"] = data;
                            lastPaymentSubject.next(data.bid);
                            observer.next(previousNoticesData);
                        });
                } else {
                    this.constructProtocolMessageOneForRecipient(currentStep.message, password, protocolSession)
                        .subscribe((data: ProtocolTransactionStepOneDataRecipient) => {
                            previousNoticesData["ProtocolTransactionStepOneDataRecipient"] = data;
                            lastPaymentSubject.next(data.bid);
                            observer.next(previousNoticesData);
                        });
                }
            } else if (currentStep.type == "ProtocolTransactionStepTwoNotice") {
                // Check if the authenticated user is originator or recipient of the message
                if (currentStep.originator.email == this.userService.getAuthenticatedUser().email) {
                    this.constructProtocolMessageTwoForOriginator(currentStep.message, password,
                        protocolSession, previousNoticesData)
                        .subscribe((data: ProtocolTransactionStepTwoDataOriginator) => {
                            previousNoticesData["ProtocolTransactionStepTwoDataOriginator"] = data;
                            lastPaymentSubject.next(data.payment);
                            observer.next(previousNoticesData);
                        });
                } else {
                    this.constructProtocolMessageTwoForRecipient(currentStep.message, password,
                        protocolSession, previousNoticesData)
                        .subscribe((data: ProtocolTransactionStepTwoDataRecipient) => {
                            previousNoticesData["ProtocolTransactionStepTwoDataRecipient"] = data;
                            lastPaymentSubject.next(data.payment);
                            observer.next(previousNoticesData);
                        });
                }
            } else if (currentStep.type == "ProtocolTransactionStepThreeNotice") {
                // TODO: Change the price phase to false in protocol transaction component

                // Check if the authenticated user is originator or recipient of the message
                if (currentStep.originator.email == this.userService.getAuthenticatedUser().email) {
                    this.constructProtocolMessageThreeForOriginator(currentStep.message, password, protocolSession)
                        .subscribe((data: ProtocolTransactionStepThreeDataOriginator) => {
                            previousNoticesData["ProtocolTransactionStepThreeDataOriginator"] = data;
                            observer.next(previousNoticesData);
                        });
                } else {
                    this.constructProtocolMessageThreeForRecipient(currentStep.message, password, protocolSession)
                        .subscribe((data: ProtocolTransactionStepThreeDataRecipient) => {
                            previousNoticesData["ProtocolTransactionStepThreeDataRecipient"] = data;
                            observer.next(previousNoticesData);
                        });
                }
            } else if (currentStep.type == "ProtocolTransactionStepFourNotice") {

            }
        });
    }


    public reconstructProtocolMessages(currentStep: ProtocolTransactionStepNotice<any>, password: string,
                                       previousNotices: ProtocolTransactionHistoryStep[],
                                       protocolSession: ProtocolSession,
                                       lastPaymentSubject: Subject<Payment>): Observable<PreviousNoticesData> {

        return Observable.create((observer) => {
            // Initialize the array where we will keep the data from all protocol transaction notices until now
            let previousNoticesData: PreviousNoticesData = {};

            // Protocol transaction notices have relationship with the previous notice. The first notice does not have previous
            // so this is where we end the process.
            while (currentStep != null) {
                // This information for every step are shown to the user
                const historyStep = {
                    messageType: currentStep.type,
                    originator: currentStep.originator.email,
                    when: currentStep.creationDate
                };
                previousNotices.push(historyStep);

                // Processing Protocol transaction steps
                if (currentStep.type == "ProtocolTransactionStepOneNotice") {
                    // Check if the authenticated user is originator or recipient of the message
                    if (currentStep.originator.email == this.userService.getAuthenticatedUser().email) {
                        this.constructProtocolMessageOneForOriginator(currentStep.message, password, protocolSession)
                            .subscribe((data: ProtocolTransactionStepOneDataOriginator) => {
                                console.log("ProtocolTransactionStepOneDataOriginator");
                                console.log(data);
                                previousNoticesData["ProtocolTransactionStepOneDataOriginator"] = data;
                                lastPaymentSubject.next(data.bid);
                            });
                    } else {
                        this.constructProtocolMessageOneForRecipient(currentStep.message, password, protocolSession)
                            .subscribe((data: ProtocolTransactionStepOneDataRecipient) => {
                                console.log("ProtocolTransactionStepOneDataRecipient");
                                console.log(data);
                                previousNoticesData["ProtocolTransactionStepOneDataRecipient"] = data;
                                lastPaymentSubject.next(data.bid);
                            });
                    }
                } else if (currentStep.type == "ProtocolTransactionStepTwoNotice") {
                    // Check if the authenticated user is originator or recipient of the message
                    if (currentStep.originator.email == this.userService.getAuthenticatedUser().email) {
                        this.constructProtocolMessageTwoForOriginator(currentStep.message, password,
                            protocolSession, previousNoticesData)
                            .subscribe((data: ProtocolTransactionStepTwoDataOriginator) => {
                                console.log("ProtocolTransactionStepTwoDataOriginator");
                                console.log(data);
                                previousNoticesData["ProtocolTransactionStepTwoDataOriginator"] = data;
                                lastPaymentSubject.next(data.payment);
                            });
                    } else {
                        console.log(previousNoticesData["ProtocolTransactionStepOneDataOriginator"]);
                        this.constructProtocolMessageTwoForRecipient(currentStep.message, password,
                            protocolSession, previousNoticesData)
                            .subscribe((data: ProtocolTransactionStepTwoDataRecipient) => {
                                previousNoticesData["ProtocolTransactionStepTwoDataRecipient"] = data;
                                console.log("ProtocolTransactionStepTwoDataRecipient");
                                console.log(data);
                                lastPaymentSubject.next(data.payment);
                            });
                    }
                } else if (currentStep.type == "ProtocolTransactionStepThreeNotice") {
                    // TODO: Change the price phase to false in protocol transaction component

                    // Check if the authenticated user is originator or recipient of the message
                    if (currentStep.originator.email == this.userService.getAuthenticatedUser().email) {
                        this.constructProtocolMessageThreeForOriginator(currentStep.message, password, protocolSession)
                            .subscribe((data: ProtocolTransactionStepThreeDataOriginator) => {
                                console.log("ProtocolTransactionStepThreeDataOriginator");
                                console.log(data);
                                previousNoticesData["ProtocolTransactionStepThreeDataOriginator"] = data;
                            });
                    } else {
                        this.constructProtocolMessageThreeForRecipient(currentStep.message, password, protocolSession)
                            .subscribe((data: ProtocolTransactionStepThreeDataRecipient) => {
                                console.log("ProtocolTransactionStepThreeDataRecipient");
                                console.log(data);
                                previousNoticesData["ProtocolTransactionStepThreeDataRecipient"] = data;
                            });
                    }
                } else if (currentStep.type == "ProtocolTransactionStepFourNotice") {

                }
                currentStep = currentStep.previousStepNotice;
            }
            console.log(previousNoticesData);
            previousNotices.reverse();

            observer.next(previousNoticesData);
        });
    }

    private initializeSecurityProfile() {
        this.securityProfile = this.securityContext.securityProfile;
        this.securityContext.securityProfileObservable().subscribe((securityProfile: SecurityProfile) => {
            this.securityProfile = securityProfile;
        });
    }

    private constructProtocolMessageOneForRecipient(jsonMessage: string, password: string,
                                                    protocolSession: ProtocolSession): Observable<ProtocolTransactionStepOneDataRecipient> {

        return Observable.create((observer) => {

            let result: ProtocolTransactionStepOneDataRecipient = {};

            let message: { 'signature': string, 'primaryData': string, 'data': string, 'dataIntegrity': string } =
                JSON.parse(jsonMessage);

            // Integrity check of the data sent
            if (this.simpleCryptographicOperations.hash(message.data) == message.dataIntegrity) {

                // Initialize Simple Security Profile
                this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
                    .subscribe((simpleSecurityProfile: SimpleSecurityProfile) => {

                        // Decrypting object
                        this.cryptographicOperations.decrypt(this.algorithmService.getAsymmetricDecryptionAlgorithm().algorithm,
                            simpleSecurityProfile.privateKeyEncryption, message.primaryData).subscribe((jsonObject: string) => {

                            // Parse decrypted object in JSON
                            let object: { sessionKey: string, nonce: number, identity: string } = JSON.parse(jsonObject);
                            result.nonce = object.nonce;
                            result.identity = object.identity;

                            // Get other party certificate to verify the signature
                            this.getOtherPartySignatureVerifyingKey(protocolSession)
                                .subscribe((otherPartyPublicKey: CryptoKey) => {

                                    // Verify other party signature
                                    this.cryptographicOperations.verify(this.algorithmService.ASYMMETRIC_SIGNING_ALG,
                                        otherPartyPublicKey,
                                        message.signature,
                                        this.simpleCryptographicOperations.hash(jsonObject)).then((verifyResult: boolean) => {
                                        if (verifyResult) {

                                            // Import session key from string into CryptoKey
                                            this.keysService.importKey(object.sessionKey, 'raw', this.algorithmService.SYMMETRIC_ALG)
                                                .subscribe((sessionKey: CryptoKey) => {
                                                    result.sessionKey = sessionKey;

                                                    // Add the session key encrypted into protocol session
                                                    this.pemParser.parsePublicKeyFromPem(this.securityProfile.encryptionPair.publicPem)
                                                        .subscribe((encryptionPublicKey: CryptoKey) => {

                                                            // Decrypt data sent with session key
                                                            this.cryptographicOperations.decrypt(this.algorithmService.getSymmetricDecryptionAlgorithm().algorithm,
                                                                sessionKey, message.data).subscribe((jsonData: string) => {
                                                                let data: { appData: { 'goodsType': DigitalGoodsType, 'paymentType': PaymentType }, bid: string, tid: number } =
                                                                    JSON.parse(jsonData);
                                                                if (data.appData.paymentType == PaymentType.Price) {
                                                                    result.bid = new Price();
                                                                } else {
                                                                    result.bid = new Contract();
                                                                }
                                                                result.bid.constructObject(data.bid);
                                                                result.tid = data.tid;
                                                                result.paymentType = data.appData.paymentType;
                                                                result.goodsType = data.appData.goodsType;
                                                                observer.next(result);
                                                            });
                                                        });
                                                });

                                        } else {
                                            console.log("signature is not valid");
                                        }
                                    });
                                });
                        });
                    });

            }
        });
    }

    private constructProtocolMessageOneForOriginator(jsonMessage: string, password: string,
                                                     protocolSession: ProtocolSession): Observable<ProtocolTransactionStepOneDataOriginator> {
        return Observable.create((observer) => {
            let result: ProtocolTransactionStepOneDataOriginator = {};

            // Parse the json message into an object
            const message: { 'signature': string, 'primaryData': string, 'data': string, 'dataIntegrity': string } =
                JSON.parse(jsonMessage);

            // Initialize simple security profile
            this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
                .subscribe((simpleSecurityProfile: SimpleSecurityProfile) => {

                    // Get the encrypted session key for the authenticated user
                    const encryptedSessionKey: string = this.helper.getEncryptedSessionKeyForAuthenticatedUser(protocolSession);

                    // Decrypt the session key
                    this.keysService.decryptSessionKey(encryptedSessionKey, simpleSecurityProfile.privateKeyEncryption)
                        .subscribe((sessionKey: CryptoKey) => {

                            // Decrypt the data in the sent message
                            this.cryptographicOperations.decrypt(this.algorithmService.getSymmetricDecryptionAlgorithm().algorithm,
                                sessionKey, message.data).subscribe((jsonData: string) => {

                                // Parse the json data into an object
                                const data: {
                                    'appData': { 'goodsType': DigitalGoodsType, 'paymentType': PaymentType },
                                    'bid': string, 'tid': number
                                } = JSON.parse(jsonData);

                                result.paymentType = data.appData.paymentType;
                                result.goodsType = data.appData.goodsType;
                                if (data.appData.paymentType == PaymentType.Price) {
                                    result.bid = new Price();
                                } else {
                                    result.bid = new Contract();
                                }
                                result.bid.constructObject(data.bid);
                                result.tid = data.tid;

                                observer.next(result);
                            });
                        });
                });
        });
    }

    private constructProtocolMessageTwoForRecipient(jsonMessage: string, password: string, protocolSession: ProtocolSession,
                                                    previousData: PreviousNoticesData): Observable<ProtocolTransactionStepTwoDataRecipient> {

        return Observable.create((observer) => {

            // Parse the json string into an object
            let message: { signature: string, data: string } = JSON.parse(jsonMessage);

            // Get other party certificate to verify the signature
            this.getOtherPartySignatureVerifyingKey(protocolSession).subscribe((otherPartyPublicKey: CryptoKey) => {

                console.log(message.data);

                // Verify other party signature
                this.cryptographicOperations.verify(this.algorithmService.ASYMMETRIC_SIGNING_ALG,
                    otherPartyPublicKey,
                    message.signature,
                    this.simpleCryptographicOperations.hash(message.data)).then((verifyResult: boolean) => {

                    if (verifyResult) {
                        // Get encrypted session key
                        let encryptedSessionKey: string = this.helper.getEncryptedSessionKeyForAuthenticatedUser(protocolSession);

                        // Initialize Simple Security Profile
                        this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
                            .subscribe((simpleSecurityProfile: SimpleSecurityProfile) => {

                                // Decrypt session key
                                this.keysService.decryptSessionKey(encryptedSessionKey, simpleSecurityProfile.privateKeyEncryption)
                                    .subscribe((sessionKey: CryptoKey) => {

                                        // Decrypt message data
                                        this.cryptographicOperations.decrypt(this.algorithmService.getSymmetricDecryptionAlgorithm().algorithm,
                                            sessionKey, message.data).subscribe((decryptedDataJson: string) => {


                                            let decryptedData: { productId: number, payment: string, nonce: number, tid: number } = JSON.parse(decryptedDataJson);
                                            let result: ProtocolTransactionStepTwoDataRecipient = {};
                                            const stepOneData: ProtocolTransactionStepOneDataOriginator = previousData["ProtocolTransactionStepOneDataOriginator"];
                                            if (stepOneData.paymentType === PaymentType.Price) {
                                                const price: Price = new Price();
                                                price.constructObject(decryptedData.payment);
                                                result.payment = price;
                                            } else if (stepOneData.paymentType === PaymentType.Contract) {
                                                const contract: Contract = new Contract();
                                                contract.constructObject(decryptedData.payment);
                                                result.payment = contract;
                                            }
                                            result.productId = decryptedData.productId;
                                            result.nonce = decryptedData.nonce;
                                            result.tid = decryptedData.tid;
                                            console.log(result);
                                            console.log(decryptedData);
                                            observer.next(result);

                                        });
                                    });

                            });
                    } else {
                        console.log("Signature is not valid");
                    }
                });
            });
        });
    }

    private constructProtocolMessageTwoForOriginator(jsonMessage: string, password: string, protocolSession: ProtocolSession,
                                                     previousData: PreviousNoticesData): Observable<ProtocolTransactionStepTwoDataOriginator> {

        return Observable.create((observer) => {
            // Parse the json string into an object
            const message: { signature: string, data: string } = JSON.parse(jsonMessage);

            // Initialize Simple Security Profile
            this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
                .subscribe((simpleSecurityProfile: SimpleSecurityProfile) => {

                    // Get encrypted session key
                    const encryptedSessionKey: string = this.helper.getEncryptedSessionKeyForAuthenticatedUser(protocolSession);

                    // Decrypt session key
                    this.keysService.decryptSessionKey(encryptedSessionKey, simpleSecurityProfile.privateKeyEncryption)
                        .subscribe((sessionKey: CryptoKey) => {

                            // Decrypt message data
                            this.cryptographicOperations.decrypt(this.algorithmService.getSymmetricDecryptionAlgorithm().algorithm,
                                sessionKey, message.data).subscribe((decryptedDataJson: string) => {


                                let decryptedData: { productId: number, payment: string, nonce: number, tid: number } = JSON.parse(decryptedDataJson);
                                let result: ProtocolTransactionStepTwoDataOriginator = {};
                                const stepOneData: ProtocolTransactionStepOneDataRecipient = previousData["ProtocolTransactionStepOneDataRecipient"];
                                if (stepOneData.paymentType === PaymentType.Price) {
                                    const price: Price = new Price();
                                    price.constructObject(decryptedData.payment);
                                    result.payment = price;
                                } else if (stepOneData.paymentType === PaymentType.Contract) {
                                    const contract: Contract = new Contract();
                                    contract.constructObject(decryptedData.payment);
                                    result.payment = contract;
                                    console.log("contract");
                                }
                                result.productId = decryptedData.productId;
                                result.nonce = decryptedData.nonce;
                                result.tid = decryptedData.tid;
                                observer.next(result);

                            });
                        });

                });
        });
    }

    private constructProtocolMessageThreeForRecipient(jsonMessage: string, password: string,
                                                      protocolSession: ProtocolSession): Observable<ProtocolTransactionStepThreeDataRecipient> {

        return Observable.create((observer) => {

            // Construct Simple Security Profile
            this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
                .subscribe((simpleProfile: SimpleSecurityProfile) => {

                    // Parse JSON into an object
                    const message: { signature: string, data: string } = JSON.parse(jsonMessage);
                    let result: ProtocolTransactionStepThreeDataRecipient = {};

                    //Extract the session key
                    this.keysService.decryptSessionKey(this.helper
                            .getEncryptedSessionKeyForAuthenticatedUser(protocolSession),
                        simpleProfile.privateKeyEncryption).subscribe((sessionKey: CryptoKey) => {

                        // Decrypt data
                        this.cryptographicOperations.decrypt(this.algorithmService.getSymmetricDecryptionAlgorithm().algorithm,
                            sessionKey, message.data).subscribe((jsonData: string) => {

                            let data: { identity: string, tid: number, nonce: number } = JSON.parse(jsonData);

                            // Extract other party verifying public key
                            this.getOtherPartySignatureVerifyingKey(protocolSession).subscribe(
                                (otherPartyVerifyingKey: CryptoKey) => {

                                    // Verify signature
                                    this.cryptographicOperations.verify(this.algorithmService.ASYMMETRIC_SIGNING_ALG,
                                        otherPartyVerifyingKey, message.signature,
                                        this.simpleCryptographicOperations.hash(jsonData))
                                        .then((verifyResult: boolean) => {
                                            if (verifyResult) {
                                                result.identity = data.identity;
                                                result.tid = data.tid;
                                                result.nonce = data.nonce;
                                                observer.next(result);
                                            } else {
                                                console.log("Signature did not verify");
                                            }
                                        });
                                });

                        });

                    });
                });
        });
    }

    private constructProtocolMessageThreeForOriginator(jsonMessage: string, password: string,
                                                       protocolSession: ProtocolSession): Observable<ProtocolTransactionStepThreeDataOriginator> {
        return Observable.create((observer) => {

            // Construct Simple Security Profile
            this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
                .subscribe((simpleProfile: SimpleSecurityProfile) => {

                    // Parse JSON into an object
                    const message: { signature: string, data: string } = JSON.parse(jsonMessage);
                    let result: ProtocolTransactionStepThreeDataOriginator = {};

                    //Extract the session key
                    this.keysService.decryptSessionKey(this.helper
                            .getEncryptedSessionKeyForAuthenticatedUser(protocolSession),
                        simpleProfile.privateKeyEncryption).subscribe((sessionKey: CryptoKey) => {

                        // Decrypt data
                        this.cryptographicOperations.decrypt(this.algorithmService.getSymmetricDecryptionAlgorithm().algorithm,
                            sessionKey, message.data).subscribe((jsonData: string) => {

                            let data: { identity: string, tid: number, nonce: number } = JSON.parse(jsonData);

                            result.identity = data.identity;
                            result.tid = data.tid;
                            result.nonce = data.nonce;
                            observer.next(result);
                        });

                    });
                });
        });
    }

    private getOtherPartySignatureVerifyingKey(protocolSession: ProtocolSession): Observable<CryptoKey> {
        const agent: Agent = this.userService.getAuthenticatedUser();
        let otherPartyEmail: string;

        if (protocolSession.participantOneSessionData.participant.email === agent.email) {
            otherPartyEmail = protocolSession.participantTwoSessionData.participant.email;
        } else {
            otherPartyEmail = protocolSession.participantOneSessionData.participant.email;
        }

        return Observable.create((observer) => {

            // Request other party certificate
            this.certificateService.get({email: otherPartyEmail})
                .subscribe((otherPartyCertificatePEM: string) => {
                    let certificate: Certificate = this.pemParser
                        .parseCertificateFromPem(otherPartyCertificatePEM);

                    // Request issuer certificate
                    this.certificateService.getIssuerCertificate().subscribe(
                        (issuerCertificatePEM: string) => {
                            let issuer: Certificate = this.pemParser
                                .parseCertificateFromPem(issuerCertificatePEM);

                            // Verify certificate
                            certificate.verify(issuer).then((verfied: boolean) => {
                                if (verfied) {

                                    // Extract public key from certificate
                                    certificate.getPublicKey().then((otherPartyPublicKey: CryptoKey) => {
                                        observer.next(otherPartyPublicKey);
                                    });

                                } else {
                                    console.log("Certificate did not verify");
                                }
                            });

                        });
                });
        });

    }

}
