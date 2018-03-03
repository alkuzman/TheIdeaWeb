/**
 * Created by Viki on 2/26/2017.
 */

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../domain/model/authentication/user";
import {KeysService} from "../../core/security-protocols/keys/keys.service";
import {UserCertificationService} from "../../core/security-protocols/certificates/user-certification.service";
import {CertificateService} from "../../domain/services/certificate/certificate.service";
import {SecurityProfileConstructorService} from "../../core/security-protocols/constructors/security-profile-constructor.service";
import {SecurityProfileService} from "../../domain/services/security-profile/security-profile.service";
/**
 * Created by Viki on 2/11/2017.
 */

@Component({
  moduleId: module.id,
  selector: "ideal-verify-page-component",
  template: `<h1>Here</h1>`
})
export class VerifyPageComponent2 implements OnInit {
  user: User;
  privateKeyE: CryptoKey;
  privateKeyEEncrypted: string;
  _pemCertificateE: string;
  _pemCertificationRequestE: string;
  privateKeyS: CryptoKey;
  privateKeySEncrypted: string;
  _pemCertificateS: string;
  _pemCertificationRequestS: string;
  password: string;

  certificateGeneratedE: boolean = false;
  certificateGeneratedS: boolean = false;
  passwordEntered: boolean = false;
  eSaved = false;
  sSaved = false;
  saveDecision: boolean = false;
  savePrivateKey: string = "YES";

  constructor(private route: ActivatedRoute, private keysService: KeysService,
              private certificateRequestGenerationService: UserCertificationService,
              private securityProfileService: SecurityProfileService,
              private certificateService: CertificateService,
              private securityProfileConstructorService: SecurityProfileConstructorService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
      //this.certificationRequestE();
      //this.certificationRequestS();
    });
  }

  /*
   public passwordReady(password: string) {
   this.password = password;
   this.keysService.generateSymmetricKeyFromPassword(this.password)
   .then((symmetricKey: CryptoKey) => {
   this.keysService.encryptPrivateKeyWithSymmetricKey(this.privateKeyE, symmetricKey)
   .subscribe((encodedEncryptedPrivateKey: string) => {
   this.privateKeyEEncrypted = encodedEncryptedPrivateKey;
   this.keysService.encryptPrivateKeyWithSymmetricKey(this.privateKeyS, symmetricKey)
   .subscribe((encodedEncryptedPrivateKey: string) => {
   this.privateKeySEncrypted = encodedEncryptedPrivateKey;
   this.passwordEntered = true;
   });
   });
   });
   }

   public saveDecisionMade() {
   if (this.savePrivateKey == "YES") {
   console.log("YES");
   this.saveSecurityProfile(true);
   } else {
   console.log("NO");
   this.saveSecurityProfile(false);
   }
   }

   private saveSecurityProfile(savePrivateKey: boolean) {
   let securityProfileE;
   let securityProfileS;
   if (savePrivateKey) {
   securityProfileE = this.securityProfileConstructorService.createSecurityProfile(this._pemCertificationRequestE,
   this._pemCertificateE, this.privateKeyEEncrypted, CertificateType.ENCRYPTION, this.user);
   securityProfileS = this.securityProfileConstructorService.createSecurityProfile(this._pemCertificationRequestS,
   this._pemCertificateS, this.privateKeySEncrypted, CertificateType.SIGNING, this.user);
   } else {
   securityProfileE = this.securityProfileConstructorService.createSecurityProfile(this._pemCertificationRequestE,
   this._pemCertificateE, undefined, CertificateType.ENCRYPTION, this.user);
   securityProfileS = this.securityProfileConstructorService.createSecurityProfile(this._pemCertificationRequestS,
   this._pemCertificateS, undefined, CertificateType.SIGNING, this.user);
   }
   this.securityProfileService.save(securityProfileE).subscribe((result: SecurityProfile) => {
   this.eSaved = true;
   this.saveDecision = this.eSaved && this.sSaved;
   });
   this.securityProfileService.save(securityProfileS).subscribe((result: SecurityProfile) => {
   this.sSaved = true;
   this.saveDecision = this.eSaved && this.sSaved;
   });
   }


   private certificationRequestE(): void {
   let publicKey: CryptoKey;
   this.keysService.generatePublicPrivateKeyPair(false).then((keyPair: CryptoKeyPair) => {
   console.log("NE");
   publicKey = keyPair.publicKey;
   this.privateKeyE = keyPair.privateKey;
   let sequence: Promise<any> = this.certificateRequestGenerationService
   .createPKCS10Internal(this.privateKeyE, publicKey, this.user).then((pkcs10Buffer) => {
   let pemRequest = this.certificateRequestGenerationService.parseCertificateRequestPEM(pkcs10Buffer);
   this._pemCertificationRequestE = pemRequest;
   this.certificateService.sign(pemRequest).subscribe((result: string) => {
   this._pemCertificateE = result;
   this.certificateGeneratedE = true;
   });
   }, error => Promise.reject(`Error parsing PKCS#10 into BER: ${error}`));
   });
   }

   private certificationRequestS(): void {
   let publicKey: CryptoKey;
   this.keysService.generatePublicPrivateKeyPair(true).then((keyPair: CryptoKeyPair) => {
   publicKey = keyPair.publicKey;
   this.privateKeyS = keyPair.privateKey;
   let sequence: Promise<any> = this.certificateRequestGenerationService
   .createPKCS10Internal(this.privateKeyS, publicKey, this.user).then((pkcs10Buffer) => {
   let pemRequest = this.certificateRequestGenerationService.parseCertificateRequestPEM(pkcs10Buffer);
   this._pemCertificationRequestS = pemRequest;
   this.certificateService.sign(pemRequest).subscribe((result: string) => {
   console.log("DA!");
   this._pemCertificateS = result;
   this.certificateGeneratedS = true;
   });
   }, error => Promise.reject(`Error parsing PKCS#10 into BER: ${error}`));
   });
   }

   get pemCertificateE(): string {
   return this._pemCertificateE;
   }

   get pemCertificationRequestE(): string {
   return this._pemCertificationRequestE;
   }

   get pemCertificateS(): string {
   return this._pemCertificateS;
   }

   get pemCertificationRequestS(): string {
   return this._pemCertificationRequestS;
   }
   */
}
