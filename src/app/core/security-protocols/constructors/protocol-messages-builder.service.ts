import {Injectable} from '@angular/core';
import {SecurityProfile} from '../../../domain/model/security/security-profile';
import {JwtSecurityContext} from '../../authentication/jwt/jwt-security-context.service';
import {KeysService} from '../keys/keys.service';
import {CryptographicOperations} from '../cryptographic-operations/cryptographic-operations';
import {UserService} from '../../../domain/services/user/user.service';
import {CertificateService} from '../../../domain/services/certificate/certificate.service';
import {HelperService} from '../helper.service';
import {ParserPemService} from '../parsers/parser-pem.service';
import {NoticeService} from '../../../domain/services/notice/notice.service';
import {PaymentRequestPhaseData} from '../../../domain/model/security/data/payment-request-phase-data';
import {ProtocolSession} from '../../../domain/model/security/protocol-session';
import {ProtocolTransactionStepNotice} from '../../../domain/model/security/notices/protocol-transaction-step-notice';
import {ProtocolTransactionStepNoticeConstructor} from './protocol-transaction-step-notice-constructor.service';
import {ProtocolTransactionStepThreeNotice} from '../../../domain/model/security/notices/protocol-transaction-step-three-notice';
import {ProtocolTransactionStepOneNotice} from '../../../domain/model/security/notices/protocol-transaction-step-one-notice';
import {ProtocolTransactionStepTwoNotice} from '../../../domain/model/security/notices/protocol-transaction-step-two-notice';
import {ProtocolParticipantOneSessionData} from '../../../domain/model/security/protocol-participant-one-session-data';
import {SimpleSecurityProfile} from '../../../domain/model/security/simple-security-profile';
import {SecurityProfileConstructorService} from './security-profile-constructor.service';
import {SimpleCryptographicOperations} from '../cryptographic-operations/simple-cryptographic-operations';
import {AlgorithmService} from '../algorithms/algorithms.service';
import {SolutionService} from '../../../domain/services/solution/solution.service';
import {Solution} from '../../../domain/model/ideas/solution';
import {DecryptingService} from '../decrypting.service';
import {EncryptingService} from '../encrypting.service';
import {ProtocolTransactionService} from '../../../domain/services/protocol-transaction/protocol-transaction.service';
import {ProtocolTransactionStepFourNotice} from '../../../domain/model/security/notices/protocol-transaction-step-four-notice';
import {PaymentType} from '../../../domain/model/payment/payment_type';
import {DigitalGoodsType} from '../../../domain/model/ideas/digital_goods_type';
import {Epoid} from '../../../domain/model/security/data/epoid';
import {ProtocolTransactionStepTwoDataRecipient} from '../../../domain/model/security/data/protocol-transaction-step-two-data-recipient';
import {ProtocolTransactionStepOneDataRecipient} from '../../../domain/model/security/data/protocol-transaction-step-one-data-recipient';
import {Observable} from 'rxjs';
import {PreviousNoticesData} from '../../../domain/model/security/data/previous-notices-data';
import {CardInformation} from '../../../domain/model/security/data/card-information';
import {ProtocolTransactionStepFourDataRecipient} from '../../../domain/model/security/data/protocol-transaction-step-four-data-recipient';
import {ProtocolTransactionStepOneDataOriginator} from '../../../domain/model/security/data/protocol-transaction-step-one-data-originator';
import {ProtocolTransactionStepFiveNotice} from '../../../domain/model/security/notices/protocol-transaction-step-five-notice';
import {ProtocolTransactionStepFiveDataRecipient} from '../../../domain/model/security/data/protocol-transaction-step-five-data-recipient';
import {UserCertificationService} from '../certificates/user-certification.service';
import {ProtocolMessagesReconstructionService} from './protocol-messages-reconstruction.service';
import {CertificateOperationsService} from '../certificates/certificate-operations.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

/**
 * Created by Viki on 2/21/2017.
 */


@Injectable()
export class ProtocolMessagesBuilderService {

  private securityProfile: SecurityProfile;

  constructor(private helper: HelperService,
              private keysService: KeysService,
              private userService: UserService,
              private pemParser: ParserPemService,
              private noticeService: NoticeService,
              private solutionService: SolutionService,
              private securityContext: JwtSecurityContext,
              private decryptingService: DecryptingService,
              private encryptingService: EncryptingService,
              private protocolTransactionService: ProtocolTransactionService,
              private certificateService: CertificateService,
              private algorithmService: AlgorithmService,
              private cryptographicOperations: CryptographicOperations,
              private simpleCryptographicOperations: SimpleCryptographicOperations,
              private securityProfileConstructor: SecurityProfileConstructorService,
              private protocolTransactionStepNoticeConstructor: ProtocolTransactionStepNoticeConstructor,
              private userCertificationService: UserCertificationService,
              private reconstructionService: ProtocolMessagesReconstructionService,
              private certificateOperations: CertificateOperationsService,
              private snackBar: MatSnackBar) {

    this.initializeSecurityProfile();
  }

  public buildProtocolMessageOne(userData: PaymentRequestPhaseData, password: string,
                                 previousData: ProtocolTransactionStepTwoDataRecipient,
                                 protocolSession: ProtocolSession, previousNotice: ProtocolTransactionStepThreeNotice,
                                 paymentType: PaymentType, goodType: DigitalGoodsType) {

    // Initialize Simple Security Profile
    this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
      .subscribe((simpleSecurityProfile: SimpleSecurityProfile) => {

        // Retrieve other party public key
        this.certificateService.getPublicKey({email: protocolSession.digitalGoods.owner.email})
          .subscribe((otherPartyPublicKeyForEncryptionPEM: string) => {

            // Parse the public key from pem format
            this.pemParser.parsePublicKeyFromPem(otherPartyPublicKeyForEncryptionPEM)
              .subscribe((otherPartyPublicKeyForEncryption: CryptoKey) => {

                // Generate the session key that will be used
                this.keysService.generateSymmetricKey()
                  .then((sessionKey: CryptoKey) => {

                    // Add the session key encrypted with own public key into protocol session
                    this.keysService.encryptSessionKey(sessionKey, simpleSecurityProfile.publicKey)
                      .subscribe((encryptedSessionKey: string) => {
                        const participant: ProtocolParticipantOneSessionData = new ProtocolParticipantOneSessionData();
                        if (protocolSession.participantOneSessionData == null) {
                          participant.participant = this.userService.getAuthenticatedUser();
                          participant.sessionKeyEncrypted = encryptedSessionKey;
                          protocolSession.participantOneSessionData = participant;
                        }

                        // Export the session key into raw format
                        this.keysService.exportKey(sessionKey, 'raw')
                          .subscribe((keyRaw: string) => {

                            // Create message object
                            const obj = {
                              'sessionKey': keyRaw,
                              'nonce': this.simpleCryptographicOperations.generateNonce(),
                              'identity': this.userService.getAuthenticatedUser().email
                            };
                            const jsonObj: string = JSON.stringify(obj);

                            // Encrypt and add none in participant one data
                            this.cryptographicOperations.encrypt(this.algorithmService.getAsymmetricEncryptionAlgorithm().algorithm,
                              simpleSecurityProfile.publicKey, obj.nonce + "").subscribe((encryptedNonce: string) => {

                              participant.nonce = encryptedNonce;

                              // Encrypt message object with other party encryption public key
                              this.cryptographicOperations.encrypt(
                                this.algorithmService.getAsymmetricEncryptionAlgorithm().algorithm,
                                otherPartyPublicKeyForEncryption, jsonObj)
                                .subscribe((initDataEncryption: string) => {
                                  const hashInitData: string = this.simpleCryptographicOperations.hash(jsonObj);

                                  // Check that certificate is not expired
                                  this.certificateOperations.checkCertificateExpired(this.userService.getAuthenticatedUser().email)
                                    .subscribe((isExpired: boolean) => {
                                      if (!isExpired) {

                                        // Sign hashed message object
                                        this.cryptographicOperations.sign(this.algorithmService.ASYMMETRIC_SIGNING_ALG,
                                          simpleSecurityProfile.privateKeySigning, hashInitData)
                                          .subscribe((signedHashedInitData: string) => {

                                            // Create message data
                                            let TID = 1;
                                            if (previousNotice != null) {
                                              TID = previousData.tid + 1;
                                            }
                                            const data = {
                                              'appData': {
                                                'goodsType': goodType,
                                                'paymentType': paymentType
                                              },
                                              'bid': userData.payment.getText(),
                                              'tid': TID
                                            };
                                            const jsonData: string = JSON.stringify(data);

                                            // Encrypt message data with session key
                                            this.cryptographicOperations.encrypt(
                                              this.algorithmService.getSymmetricEncryptionAlgorithm().algorithm,
                                              sessionKey, jsonData).subscribe((dataEncrypted: string) => {
                                              const hashedDataEncrypted: string = this.simpleCryptographicOperations.hash(dataEncrypted);

                                              // Construct final message
                                              const message = {
                                                'signature': signedHashedInitData,
                                                'primaryData': initDataEncryption,
                                                'data': dataEncrypted,
                                                'dataIntegrity': hashedDataEncrypted
                                              };
                                              const jsonMessage: string = JSON.stringify(message);

                                              // Construct notice and send notice
                                              this.sendMessage(this.protocolTransactionStepNoticeConstructor
                                                .constructProtocolTransactionStepOneNotice(protocolSession, jsonMessage,
                                                  this.userService.getAuthenticatedUser(),
                                                  <ProtocolTransactionStepThreeNotice>previousNotice,
                                                  previousNotice == null ? protocolSession.digitalGoods.owner : previousNotice.originator));

                                            });
                                          });
                                      }
                                    });
                                });
                            });
                          });
                      });
                  });
              });
          });
      });
  }

  public buildProtocolMessageTwo(userData: PaymentRequestPhaseData, password: string,
                                 previousMessageData: ProtocolTransactionStepOneDataRecipient,
                                 protocolSession: ProtocolSession, previousNotice: ProtocolTransactionStepOneNotice) {

    // Create message data
    const data = {
      'productId': protocolSession.digitalGoods.id,
      'payment': userData.payment.getText(),
      'nonce': previousMessageData.nonce,
      'tid': previousMessageData.tid + 1
    };
    const jsonData: string = JSON.stringify(data);

    // Initialize Simple Security Profile
    this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
      .subscribe((simpleSecurityProfile: SimpleSecurityProfile) => {

        // Extract session key
        this.keysService.decryptSessionKey(this.helper.getEncryptedSessionKeyForAuthenticatedUser(protocolSession),
          simpleSecurityProfile.privateKeyEncryption).subscribe((sessionKey: CryptoKey) => {

          // Encrypt message data with session key
          this.cryptographicOperations.encrypt(this.algorithmService.getSymmetricEncryptionAlgorithm().algorithm,
            sessionKey, jsonData).subscribe((encryptedData: string) => {
            const encryptedDataHash = this.simpleCryptographicOperations.hash(encryptedData);

            // Sign the hash value in order to authenticate yourself to the other party
            this.cryptographicOperations.sign(this.algorithmService.ASYMMETRIC_SIGNING_ALG, simpleSecurityProfile.privateKeySigning,
              encryptedDataHash).subscribe((signedData: string) => {

              // Construct final message
              const message = {
                'signature': signedData,
                'data': encryptedData
              };
              const jsonMessage: string = JSON.stringify(message);

              // Construct notice
              const notice: ProtocolTransactionStepTwoNotice = this.protocolTransactionStepNoticeConstructor
                .constructProtocolTransactionStepTwoNotice(protocolSession, jsonMessage,
                  this.userService.getAuthenticatedUser(),
                  <ProtocolTransactionStepOneNotice>previousNotice,
                  previousNotice.originator);

              // Send notice
              this.sendMessage(notice);
            });

          });
        });
      });
  }

  public buildProtocolMessageThree(password: string,
                                   previousMessageData: ProtocolTransactionStepTwoDataRecipient,
                                   protocolSession: ProtocolSession,
                                   previousNotice: ProtocolTransactionStepTwoNotice) {

    // Initialize Simple Security Profile
    this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
      .subscribe((simpleProfile: SimpleSecurityProfile) => {

        // Construct message data
        const data = {
          "identity": this.userService.getAuthenticatedUser().email,
          "tid": previousMessageData.tid + 1,
          "nonce": previousMessageData.nonce
        };

        // Convert the message data into JSON
        const jsonData: string = JSON.stringify(data);

        // Extract The Session Key
        this.keysService.decryptSessionKey(this.helper
            .getEncryptedSessionKeyForAuthenticatedUser(protocolSession),
          simpleProfile.privateKeyEncryption).subscribe((sessionKey: CryptoKey) => {

          // Encrypt the json from the message data with the session key
          this.cryptographicOperations.encrypt(this.algorithmService.getSymmetricEncryptionAlgorithm().algorithm,
            sessionKey, jsonData).subscribe((dataEncrypted: string) => {

            // Hash the json from the message data
            const hashedData: string = this.simpleCryptographicOperations.hash(jsonData);

            // Sign the hash
            this.cryptographicOperations.sign(this.algorithmService.ASYMMETRIC_SIGNING_ALG,
              simpleProfile.privateKeySigning, hashedData).subscribe((signedHashedData: string) => {

              const message = {
                "signature": signedHashedData,
                "data": dataEncrypted
              };
              const jsonMessage: string = JSON.stringify(message);

              const notice: ProtocolTransactionStepThreeNotice = this.protocolTransactionStepNoticeConstructor
                .constructProtocolTransactionStepThreeNotice(protocolSession, jsonMessage,
                  this.userService.getAuthenticatedUser(),
                  <ProtocolTransactionStepTwoNotice>previousNotice,
                  previousNotice.originator);

              this.sendMessage(notice);
            });
          });
        });

      });

  }

  public buildProtocolMessageFour(password: string, protocolSession: ProtocolSession,
                                  previousNotice: ProtocolTransactionStepThreeNotice, previousData: PreviousNoticesData) {

    // Initialize simple security profile
    this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
      .subscribe((simpleProfile: SimpleSecurityProfile) => {

        // Generate key for encrypting the goods
        this.keysService.generateSymmetricKey().then((dataEncryptionKey: CryptoKey) => {

          // Encrypt key for encrypting goods with public key for encryption
          this.keysService.encryptSessionKey(dataEncryptionKey, simpleProfile.publicKey)
            .subscribe((dataEncryptionKeyEncrypted) => {
              protocolSession.participantTwoSessionData.dataEncryptionKeyEncrypted = dataEncryptionKeyEncrypted;

              // Get encrypted goods (solution or evaluation)
              this.convertDigitalGoodsToEncryptedString(previousData, dataEncryptionKey, protocolSession, simpleProfile)
                .subscribe((encryptedGoods: string) => {

                  // Hash the encrypted solution
                  const hashedEncryptedSolution = this.simpleCryptographicOperations.hash(encryptedGoods);

                  // Get EPOID
                  this.protocolTransactionService.getNewEpoid(previousNotice.originator.email)
                    .subscribe((epoid: Epoid) => {

                      const epoidJson = JSON.stringify(epoid);

                      // Construct data for encryption
                      const data = {
                        "goodsIntegrity": hashedEncryptedSolution,
                        "epoid": epoid
                      };

                      // Convert data into json
                      const jsonData = JSON.stringify(data);

                      // Decrypt session key
                      this.keysService.decryptSessionKey(this.helper.getEncryptedSessionKeyForAuthenticatedUser(protocolSession),
                        simpleProfile.privateKeyEncryption).subscribe((sessionKey: CryptoKey) => {

                        // Encrypt json data
                        this.cryptographicOperations.encrypt(this.algorithmService.getSymmetricEncryptionAlgorithm().algorithm, sessionKey,
                          jsonData).subscribe((encryptedJsonData: string) => {

                          const message = {
                            "goods": encryptedGoods,
                            "dataIntegrity": encryptedJsonData
                          };

                          const jsonMessage = JSON.stringify(message);

                          const notice: ProtocolTransactionStepFourNotice =
                            this.protocolTransactionStepNoticeConstructor
                              .constructProtocolTransactionStepFourNotice(protocolSession, jsonMessage,
                                this.userService.getAuthenticatedUser(), previousNotice, previousNotice.originator);

                          this.sendMessage(notice);
                        });
                      });
                    });

                });
            });
        });
      });
  }

  public buildProtocolMessageFive(cardInfo: CardInformation = null, password: string, protocolSession: ProtocolSession,
                                  previousNotice: ProtocolTransactionStepFourNotice, previousData: PreviousNoticesData) {

    // Get data from previous messages
    const dataStepTwoRecipient: ProtocolTransactionStepTwoDataRecipient = previousData["ProtocolTransactionStepTwoDataRecipient"];
    const dataStepFourRecipient: ProtocolTransactionStepFourDataRecipient = previousData["ProtocolTransactionStepFourDataRecipient"];
    const dataStepOneOriginator: ProtocolTransactionStepOneDataOriginator = previousData["ProtocolTransactionStepOneDataOriginator"];

    // Get application data
    const appData = {
      "goodsType": dataStepOneOriginator.goodsType,
      "paymentType": dataStepOneOriginator.paymentType
    };

    // Construct simple security profile
    this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
      .subscribe((simpleProfile: SimpleSecurityProfile) => {

        // Transform payment information into a sting data
        const userData = (appData.paymentType === PaymentType.Money) ?
          JSON.stringify(cardInfo) : dataStepTwoRecipient.payment.getText();

        this.setupPaymentInformation(simpleProfile, appData.paymentType, userData)
          .subscribe((paymentInfo: string) => {

            // Get the session key that is shared with the server
            this.protocolTransactionService.getSessionKeyWithServer(this.userService.getAuthenticatedUser().email)
              .subscribe((encryptedServerKey: string) => {

                // Decrypt the session key
                this.cryptographicOperations.decrypt(this.algorithmService.getAsymmetricDecryptionAlgorithm().algorithm,
                  simpleProfile.privateKeyEncryption, encryptedServerKey)
                  .subscribe((decryptedServerKey: string) => {

                    this.keysService.importKey(decryptedServerKey, "raw", this.algorithmService.SYMMETRIC_ALG)
                      .subscribe((serverSharedKey: CryptoKey) => {

                        // Encrypt payment information
                        const alg: AesCtrParams = {
                          counter: this.simpleCryptographicOperations.getRandomArrayBuffer(16),
                          length: 112,
                          name: this.algorithmService.SYMMETRIC_ALG
                        };
                        this.cryptographicOperations.encrypt(alg, serverSharedKey, paymentInfo)
                          .subscribe((encryptedPaymentInformation: string) => {

                            console.log(encryptedPaymentInformation);
                            console.log("=====Payment======");
                            console.log(dataStepTwoRecipient.payment.getText());
                            // Construct EPO
                            const epo = {
                              "identity": this.userService.getAuthenticatedUser().email,
                              "productId": protocolSession.digitalGoods.id,
                              "payment": dataStepTwoRecipient.payment.getText(),
                              "merchant": protocolSession.digitalGoods.owner.email,
                              "goodsIntegrity": this.simpleCryptographicOperations.hash(dataStepFourRecipient.goods),
                              "appData": JSON.stringify(appData),
                              "epoid": JSON.stringify(dataStepFourRecipient.epoid),
                              "paymentInformation": {
                                text: encryptedPaymentInformation,
                                iv: this.simpleCryptographicOperations.convertUint8ToString(new Uint8Array(<ArrayBuffer> alg.counter))
                              }
                            };

                            // Generate Nonce
                            const nonce = this.simpleCryptographicOperations.generateNonce();

                            // Construct data
                            const data = {
                              "epo": epo,
                              "nonce": nonce
                            };

                            // Parse data into json
                            const jsonData: string = JSON.stringify(data);

                            // Decrypt session key
                            this.keysService.decryptSessionKey(this.helper.getEncryptedSessionKeyForAuthenticatedUser(protocolSession),
                              simpleProfile.privateKeyEncryption).subscribe((sessionKey: CryptoKey) => {

                              // Encrypt data with session key
                              this.cryptographicOperations.encrypt(this.algorithmService.getSymmetricEncryptionAlgorithm().algorithm,
                                sessionKey, jsonData).subscribe((encryptedData: string) => {

                                // TODO: Check if the signature needs to be encrypted
                                // Sign json data
                                this.cryptographicOperations.sign(this.algorithmService.ASYMMETRIC_SIGNING_ALG,
                                  simpleProfile.privateKeySigning, jsonData).subscribe((signature: string) => {

                                  // Encrypt signature
                                  this.cryptographicOperations.encrypt(this.algorithmService.getSymmetricEncryptionAlgorithm().algorithm,
                                    sessionKey, signature).subscribe((encryptedSignature: string) => {

                                    // Construct message
                                    const message = {
                                      "signature": encryptedSignature,
                                      "data": encryptedData
                                    };

                                    // Parse message into json
                                    const jsonMessage = JSON.stringify(message);

                                    // Construct notice
                                    const notice: ProtocolTransactionStepFiveNotice =
                                      this.protocolTransactionStepNoticeConstructor
                                        .constructProtocolTransactionStepFiveNotice(protocolSession, jsonMessage,
                                          this.userService.getAuthenticatedUser(), previousNotice, previousNotice.originator);

                                    // Send notice
                                    this.sendMessage(notice);
                                  });
                                });
                              });

                            });
                          });
                      });
                  });
              });
          });
      });

  }

  public buildProtocolMessageSix(userData: string, password: string, protocolSession: ProtocolSession,
                                 previousNotice: ProtocolTransactionStepFiveNotice, previousData: PreviousNoticesData) {

    const stepFiveData: ProtocolTransactionStepFiveDataRecipient = previousData["ProtocolTransactionStepFiveDataRecipient"];

    // Construct simple security profile
    this.securityProfileConstructor.getSecurityProfileSimple(password, this.securityProfile)
      .subscribe((simpleProfile: SimpleSecurityProfile) => {

        // Get session key shared with the server
        this.protocolTransactionService.getSessionKeyWithServer(this.userService.getAuthenticatedUser().email)
          .subscribe((encryptedServerKey: string) => {

            // Decrypt the session key
            this.cryptographicOperations.decrypt(this.algorithmService.getAsymmetricDecryptionAlgorithm().algorithm,
              simpleProfile.privateKeyEncryption, encryptedServerKey)
              .subscribe((decryptedServerKey: string) => {

                // Import session key
                this.keysService.importKey(decryptedServerKey, "raw", this.algorithmService.SYMMETRIC_ALG)
                  .subscribe((sessionKeyServer: CryptoKey) => {

                    // Get encryption goods key
                    this.keysService.decryptSessionKey(this.helper.getKeyForEncryptionGoods(protocolSession),
                      simpleProfile.privateKeyEncryption)
                      .subscribe((goodsEncryptionKey: CryptoKey) => {

                        this.keysService.exportKey(goodsEncryptionKey, "raw")
                          .subscribe((goodsEncryptionKeyStr: string) => {
                            // Construct signature data
                            const signatureData = {
                              "signature": stepFiveData.signature,
                              "epo": stepFiveData.epo,
                              "nonce": stepFiveData.nonce,
                              "key": goodsEncryptionKeyStr
                            };

                            if (userData != null) {
                              signatureData["merchantAccount"] = userData;
                            }

                            // Sign signature data
                            this.cryptographicOperations.sign(this.algorithmService.ASYMMETRIC_SIGNING_ALG,
                              simpleProfile.privateKeySigning, JSON.stringify(signatureData))
                              .subscribe((signature: string) => {

                                // Construct message data
                                const data = {
                                  "signature": signature,
                                  "data": signatureData
                                };

                                // Encrypt message data
                                const alg: AesCtrParams = {
                                  counter: this.simpleCryptographicOperations.getRandomArrayBuffer(16),
                                  length: 117,
                                  name: this.algorithmService.SYMMETRIC_ALG
                                };
                                console.log(new Uint8Array(<ArrayBuffer> alg.counter));

                                this.cryptographicOperations.encrypt(alg, sessionKeyServer, JSON.stringify(data))
                                  .subscribe((encryptedData: string) => {

                                    // Construct message
                                    const message = {
                                      "text": encryptedData,
                                      "iv": this.simpleCryptographicOperations
                                        .convertUint8ToString(new Uint8Array(<ArrayBuffer> alg.counter))
                                    };

                                    // Parse message into json
                                    const jsonMessage = JSON.stringify(message);

                                    // Sent request
                                    this.protocolTransactionService.sendTransactionRequestToServer(jsonMessage,
                                      this.userService.getAuthenticatedUser().email)
                                      .subscribe((responseMessage: string) => {
                                        this.snackBar.open(responseMessage, undefined, <MatSnackBarConfig>{duration: 3000});
                                      });

                                  });
                              });
                          });
                      });
                  });
              });
          });
      });
  }

  private setupPaymentInformation(simpleProfile: SimpleSecurityProfile,
                                  paymentType: PaymentType, paymentData: string): Observable<string> {

    return Observable.create((observer) => {

      // Check the payment type
      if (paymentType === PaymentType.Money) {

        // Return the card information
        observer.next(paymentData);
      } else if (paymentType === PaymentType.Contract) {

        console.log(paymentData);

        // Sign the contract
        this.cryptographicOperations.sign(this.algorithmService.ASYMMETRIC_SIGNING_ALG,
          simpleProfile.privateKeySigning, paymentData)
          .subscribe((signedContract: string) => {

            // Return the signed contract
            observer.next(signedContract);
          });
      }
    });
  }

  private initializeSecurityProfile(): void {
    this.securityProfile = this.securityContext.securityProfile;
    this.securityContext.securityProfileObservable().subscribe((securityProfile: SecurityProfile) => {
      this.securityProfile = securityProfile;
    });
  }

  private sendMessage(notice: ProtocolTransactionStepNotice<any>) {
    if (notice.previousStepNotice != null) {
      notice.previousStepNotice.activated = true;
    }
    this.noticeService.addNotice(notice).subscribe(() => {
      console.log("SENT");
    });
  }

  private convertDigitalGoodsToEncryptedString(previousData: PreviousNoticesData, encryptionKey: CryptoKey,
                                               protocolSession: ProtocolSession, simpleProfile: SimpleSecurityProfile): Observable<string> {

    return Observable.create((observer) => {
      const protocolTransactionStepOneDataForRecipient: ProtocolTransactionStepOneDataRecipient =
        previousData["ProtocolTransactionStepOneDataRecipient"];

      // Different approaches based on the goods type
      if (protocolTransactionStepOneDataForRecipient.goodsType === DigitalGoodsType.Solution) {
        // Get solution for given idea
        this.solutionService.getSolution(protocolSession.digitalGoods.id).subscribe((solution: Solution) => {

          // Decrypt the solution with the standard user key for encrypting ideas
          this.decryptingService.decryptSolutionWithKey(solution.text, simpleProfile.symmetricKey)
            .subscribe((solutionText: string) => {

              // Encrypt the solution with the session key for this transaction
              this.encryptingService.encryptSolutionWithKey(solutionText, encryptionKey)
                .subscribe((encryptedSolution: string) => {
                  observer.next(encryptedSolution);
                });
            });
        });

      } else if (protocolTransactionStepOneDataForRecipient.goodsType === DigitalGoodsType.Evaluation) {
        // TODO: Implement if the good type is evaluation
      }
    });
  }
}
