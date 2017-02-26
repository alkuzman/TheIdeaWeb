import {Injectable, OnInit} from "@angular/core";
import {ProtocolTransactionMessageOne} from "../../../../domain/model/security/messages/protocol-transaction-message-one";
import {SecurityProfile} from "../../../../domain/model/security/security-profile";
import {JwtSecurityContext} from "../../../authentication/jwt/jwt-security-context.service";
import {KeysService} from "../../keys/keys.service";
import {CryptographicOperations} from "../../cryptographic-operations/cryptographic-operations";
import {UserService} from "../../../../domain/services/user/user.service";
import {CertificateService} from "../../../../domain/services/certificate/certificate.service";
import {Agent} from "../../../../domain/model/authentication/agent";
import {HelperService} from "../../helper.service";
import {Observable} from "rxjs";
import {ParserPemService} from "../../parsers/parser-pem.service";
/**
 * Created by Viki on 2/21/2017.
 */


@Injectable()
export class ProtocolMessageOneConstructorService implements OnInit {

  //private securityProfileEncryption: SecurityProfile;
  //private securityProfileSigning: SecurityProfile;
  private securityProfile: SecurityProfile;

  constructor(private securityContext: JwtSecurityContext, private certificateService: CertificateService,
              private keysService: KeysService, private cryptographicOperations: CryptographicOperations,
              private userService: UserService, private helper: HelperService,
              private pemParser: ParserPemService) {

    //this.initializeSecurityProfiles();
    this.initializeSecurityProfile();
  }

  private initializeSecurityProfile(): void {
    this.securityProfile = this.securityContext.securityProfile;
    this.securityContext.securityProfileObservable().subscribe((securityProfile: SecurityProfile) => {
      this.securityProfile = securityProfile;
    });
  }

  /*
  private initializeSecurityProfiles(): void {
    this.securityProfileEncryption = this.securityContext.securityProfileEncryption;
    this.securityProfileSigning = this.securityContext.securityProfileSigning;
    this.securityContext.securityProfileEncryptionObservable().subscribe((securityProfile: SecurityProfile) => {
      console.log(securityProfile);
      this.securityProfileEncryption = securityProfile;
    });
    this.securityContext.securityProfileSigningObservable().subscribe((securityProfile: SecurityProfile) => {
      console.log(securityProfile);
      this.securityProfileSigning = securityProfile;
    });
  }
   */

  ngOnInit(): void {
    //this.getAuthenticatedUserSecurityProfile();
    console.log("on init");
    //this.initializeSecurityProfiles();
  }

  public createProtocolMessageOne(messageOne: ProtocolTransactionMessageOne, owner: Agent, password: string) {
    this.certificateService.getPublicKey({email: owner.email})
      .subscribe((pemPublicKeyEncryption: string) => {

        this.pemParser.parsePublicKeyFromPem(pemPublicKeyEncryption)
          .subscribe((ownerPublicKeyEncryption: CryptoKey) => {
            this.keysService.generateSymmetricKey()
              .then((key: CryptoKey) => {
                this.keysService.exportKey(key, 'raw')
                  .then((keyBuffer: ArrayBuffer) => {
                    let Kcm: string = this.cryptographicOperations.convertUint8ToString(new Uint8Array(keyBuffer));
                    let N: string = this.cryptographicOperations.generateNonce();
                    let obj = {
                      'key': Kcm,
                      'nonce': N,
                      'identity': this.userService.getAuthenticatedUser().email
                    };
                    let jsonObj: string = JSON.stringify(obj);
                    console.log(jsonObj);
                    this.cryptographicOperations.encrypt(
                      this.cryptographicOperations.getAlgorithm('RSA-OAEP', 'SHA256', 'encrypt').algorithm,
                      ownerPublicKeyEncryption,
                      this.cryptographicOperations.convertStringToBuffer(jsonObj))
                      .then((initDataEncryptionBuf: ArrayBuffer) => {
                        console.log("encrypt passed");
                        let initDataEncryption: string = this.cryptographicOperations
                          .convertUint8ToString(new Uint8Array(initDataEncryptionBuf));
                        console.log(initDataEncryption);
                        let hashInitData: string = this.cryptographicOperations.hash(jsonObj);
                        console.log(hashInitData);
                        this.extractPrivateKey(this.securityProfile.encryptedPrivateKey, password,
                          this.helper.ASYMMETRIC_SIGNING_ALG)
                          .subscribe((privateSigningKey: CryptoKey) => {
                            console.log("private signing key");
                            this.cryptographicOperations.sign(this.helper.ASYMMETRIC_SIGNING_ALG, privateSigningKey,
                              this.cryptographicOperations.convertStringToUint8(hashInitData).buffer)
                              .then((signedHashedInitDataBuf: ArrayBuffer) => {
                                console.log("signing passed");
                                let signedHashedInitData: string = this.cryptographicOperations
                                  .convertUint8ToString(new Uint8Array(signedHashedInitDataBuf));
                                console.log(signedHashedInitData);
                                let data = {
                                  'bid': messageOne.biddingPrice
                                };
                                let jsonData: string = JSON.stringify(data);
                                this.cryptographicOperations.encrypt(
                                  this.cryptographicOperations.getAlgorithm('AES-CTR', 'SHA256', 'encrypt').algorithm,
                                  key,
                                  this.cryptographicOperations.convertStringToBuffer(jsonData))
                                  .then((dataEncryptedBuf: ArrayBuffer) => {
                                    let dataEncrypted: string = this.cryptographicOperations
                                      .convertUint8ToString(new Uint8Array(dataEncryptedBuf));
                                    let message = {
                                      'signature': signedHashedInitData,
                                      'object': initDataEncryption,
                                      'data': dataEncrypted
                                    };
                                    let jsonMessage: string = JSON.stringify(message);
                                    console.log(jsonMessage);
                                  });
                              });
                          });
                      });
                  });
              });
          });

      });
  }

  private extractPrivateKey(encryptedKey: string, password: string, algorithm: string): Observable<CryptoKey> {
    return Observable.create((observer) => {
      console.log("TUKAAAAAAAAAAAAAAA");
      this.keysService.generateSymmetricKeyFromPassword(password)
        .then((symmetricKey: CryptoKey) => {
          this.keysService.decryptPrivateKeyWithSymmetricKey(encryptedKey, symmetricKey, algorithm)
            .subscribe((privateKey: CryptoKey) => {
              observer.next(privateKey);
            });
        });

    });
  }
}
