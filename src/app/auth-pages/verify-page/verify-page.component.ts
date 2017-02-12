import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../domain/model/authentication/user";
import {KeysGenerationService} from "../../core/security-protocols/keys/keys-generation.service";
import {CertificateRequestGenerationService} from "../../core/security-protocols/certificates/certificates-requests-generation.service";
import {CertificateService} from "../../core/security-protocols/services/certificate.service";
import {Observable} from "rxjs";
import {CryptographicOperations} from "../../core/security-protocols/cryptographic-operations/cryptographic-operations";
import {SecurityProfile} from "../../domain/model/security/security-profile";
/**
 * Created by Viki on 2/11/2017.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-verify-page-component",
  templateUrl: "verify-page.component.html"
})
export class VerifyPageComponent implements OnInit {
  private user: User;
  private privateKey: CryptoKey;
  private pemCertificate: string;
  private certificateGenerated = false;

  constructor(private route: ActivatedRoute, private keysGenerationService: KeysGenerationService,
              private certificateRequestGenerationService: CertificateRequestGenerationService,
              private certificateService: CertificateService,
              private cryptographicOperations: CryptographicOperations) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: {user: User}) => {
      this.user = data.user;
      this.certificationRequest();
    });
  }

  private certificationRequest(): void {
    let publicKey: CryptoKey;
    this.keysGenerationService.generatePublicPrivateKeyPair().then((keyPair: CryptoKeyPair) => {
      publicKey = keyPair.publicKey;
      this.privateKey = keyPair.privateKey;
      let sequence: Promise<any> = this.certificateRequestGenerationService
        .createPKCS10Internal(this.privateKey, publicKey, this.user);
      sequence
        .then((pkcs10Buffer) => this.certificateRequestGenerationService.parsePEM(pkcs10Buffer),
          error => Promise.reject(`Error parsing PKCS#10 into BER: ${error}`))
        .then((pemRequest: string) => this.certificateService.sign(pemRequest),
          error => Promise.reject(`Error parsing PKCS#10 into PEM: ${error}`))
        .then((observable: Observable<any>) => observable.subscribe((result: string) => {
          this.pemCertificate = result;
          setTimeout(() => {
            this.certificateGenerated = true;
          }, 2000);

        }));
    });
  }

  private createSecurityProfile(certificatePEM: string, privateKey: CryptoKey, passphrase: string) {
    let keyArray = this.keysGenerationService.generateSymmetricKeyFromPassword(passphrase);
    this.keysGenerationService.importKey(keyArray, 'raw', 'AES-CTR').then((symmetricKey: CryptoKey) => {
      this.keysGenerationService.exportKey(privateKey, 'pkcs8').then((privateRawKey: ArrayBuffer) => {
        console.log(new Uint8Array(privateRawKey));
        this.cryptographicOperations.encrypt(
          this.cryptographicOperations.getAlgorithm('AES-CTR', 'SHA-256', 'encrypt').algorithm,
          symmetricKey, privateRawKey).then((ciphertext: ArrayBuffer) => {
          let cipherArray: Uint8Array = new Uint8Array(ciphertext);
          let encodedCipher: string = this.cryptographicOperations.convertUint8ToString(cipherArray);
          let securityProfile: SecurityProfile = new SecurityProfile();
          securityProfile.certificatePEM = certificatePEM;
          securityProfile.encryptedPrivateKey = encodedCipher;
          securityProfile.agent = this.user;
          this.certificateService.save(securityProfile).subscribe((result: SecurityProfile) => console.log(result));
        });
      });
    });
  }

}
