import {Injectable, OnInit} from "@angular/core";
import {ProtocolTransactionMessageOne} from "../../../../domain/model/security/messages/protocol-transaction-message-one";
import {SecurityProfile} from "../../../../domain/model/security/security-profile";
import {CertificateType} from "../../../../domain/model/enumerations/certificate-type";
import {JwtSecurityContext} from "../../../authentication/jwt/jwt-security-context.service";
import {KeysService} from "../../keys/keys.service";
import {CryptographicOperations} from "../../cryptographic-operations/cryptographic-operations";
import {UserService} from "../../../../domain/services/user/user.service";
import {CertificateService} from "../../../../domain/services/certificate/certificate.service";
import {Agent} from "../../../../domain/model/authentication/agent";
import {CertificateRequestGenerationService} from "../../certificates/certificates-requests-generation.service";
import Certificate from "pkijs/src/Certificate";
import {HelperService} from "../../helper.service";
import {Observable} from "rxjs";
/**
 * Created by Viki on 2/21/2017.
 */


@Injectable()
export class ProtocolMessageOneConstructorService implements OnInit {

  private securityProfileEncryption: SecurityProfile;
  private securityProfileSigning: SecurityProfile;

  constructor(private securityContext: JwtSecurityContext, private certificateService: CertificateService,
              private keysService: KeysService, private cryptographicOperations: CryptographicOperations,
              private userService: UserService, private helper: HelperService,
              private certificatesGeneration: CertificateRequestGenerationService) {

    this.initializeSecurityProfiles();
  }

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

  ngOnInit(): void {
    //this.getAuthenticatedUserSecurityProfile();
    console.log("on init");
    //this.initializeSecurityProfiles();
  }

  public createProtocolMessageOne(messageOne: ProtocolTransactionMessageOne, owner: Agent, password: string) {
    this.certificateService.get({email: owner.email}, CertificateType.SIGNING)
      .subscribe((pemCertificateEncryption: string) => {

        let certificateEncryption: Certificate = this.certificatesGeneration
          .parseCertficiateFromPem(pemCertificateEncryption);

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
                certificateEncryption.getPublicKey()
                  .then((ownerPublicKey: CryptoKey) => {
                    console.log(ownerPublicKey.algorithm);
                    this.cryptographicOperations.encrypt(
                      this.cryptographicOperations.getAlgorithm('RSA-OAEP', 'SHA256', 'encrypt').algorithm,
                      ownerPublicKey,
                      this.cryptographicOperations.convertStringToBuffer(jsonObj))
                      .then((initDataEncryptionBuf: ArrayBuffer) => {
                        console.log("encrypt passed");
                        let initDataEncryption: string = this.cryptographicOperations
                          .convertUint8ToString(new Uint8Array(initDataEncryptionBuf));
                        let hashInitData: string = this.cryptographicOperations.hash(jsonObj);
                        this.extractPrivateKey(this.securityProfileSigning.encryptedPrivateKey, password,
                          this.helper.ASYMMETRIC_SIGNING_ALG)
                          .map((privateSigningKey: CryptoKey) => {
                            this.cryptographicOperations.sign(this.helper.ASYMMETRIC_ALG, privateSigningKey,
                              this.cryptographicOperations.convertStringToUint8(hashInitData).buffer)
                              .then((signedHashedInitDataBuf: ArrayBuffer) => {
                                let signedHashedInitData: string = this.cryptographicOperations
                                  .convertUint8ToString(new Uint8Array(signedHashedInitDataBuf));
                                let data = {
                                  'bid': messageOne.biddingPrice
                                };
                                let jsonData: string = JSON.stringify(data);
                                this.cryptographicOperations.encrypt(
                                  this.cryptographicOperations.getAlgorithm('AES-CTR', 'SHA256', 'encrypt').algorithm,
                                  key,
                                  this.cryptographicOperations.convertStringToUint8(jsonData).buffer)
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
      this.keysService.generateSymmetricKeyFromPassword(password)
        .then((symmetricKey: CryptoKey) => {
          this.keysService.decryptPrivateKeyWithSymmetricKey(encryptedKey, symmetricKey, algorithm)
            .map((privateKey: CryptoKey) => {
              observer.next(privateKey);
            });
        });

    });
  }
}
