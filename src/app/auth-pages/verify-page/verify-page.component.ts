import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../domain/model/authentication/user";
import {KeysService} from "../../core/security-protocols/keys/keys.service";
import {CertificateRequestGenerationService} from "../../core/security-protocols/certificates/certificates-requests-generation.service";
import {SecurityProfile} from "../../domain/model/security/security-profile";
import {CertificateService} from "../../domain/services/certificate/certificate.service";
import {SecurityProfileService} from "../../core/security-protocols/security-profile/security-profile.service";
import {CertificateType} from "../../domain/model/enumerations/certificate-type";
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
  private privateKeyE: CryptoKey;
  private privateKeyEEncrypted: string;
  private _pemCertificateE: string;
  private _pemCertificationRequestE: string;
  private privateKeyS: CryptoKey;
  private privateKeySEncrypted: string;
  private _pemCertificateS: string;
  private _pemCertificationRequestS: string;
  private password: string;

  private certificateGeneratedE: boolean = false;
  private certificateGeneratedS: boolean = false;
  private passwordEntered: boolean = false;
  private saveDecision: boolean = false;
  private savePrivateKey: string = "YES";

  constructor(private route: ActivatedRoute, private keysService: KeysService,
              private certificateRequestGenerationService: CertificateRequestGenerationService,
              private certificateService: CertificateService,
              private securityProfileService: SecurityProfileService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: {user: User}) => {
      this.user = data.user;
      this.certificationRequestE();
      this.certificationRequestS();
    });
  }

  public passwordReady(password: string) {
    this.password = password;
    this.keysService.generateSymmetricKeyFromPassword(this.password, 6530, 32, 'SHA256')
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
    this.saveDecision = true;
  }

  private saveSecurityProfile(savePrivateKey: boolean) {
    let securityProfileE;
    let securityProfileS;
    if (savePrivateKey) {
      securityProfileE = this.securityProfileService.createSecurityProfile(this._pemCertificationRequestE,
        this._pemCertificateE, this.privateKeyEEncrypted, CertificateType.ENCRYPTION, this.user);
      securityProfileS = this.securityProfileService.createSecurityProfile(this._pemCertificationRequestS,
        this._pemCertificateS, this.privateKeySEncrypted, CertificateType.SIGNING, this.user);
    } else {
      securityProfileE = this.securityProfileService.createSecurityProfile(this._pemCertificationRequestE,
        this._pemCertificateE, undefined, CertificateType.ENCRYPTION, this.user);
      securityProfileS = this.securityProfileService.createSecurityProfile(this._pemCertificationRequestS,
        this._pemCertificateS, undefined, CertificateType.SIGNING, this.user);
    }
    this.certificateService.save(securityProfileE).subscribe((result: SecurityProfile) => console.log(result));
    this.certificateService.save(securityProfileS).subscribe((result: SecurityProfile) => console.log(result));
  }

  private certificationRequestE(): void {
    let publicKey: CryptoKey;
    this.keysService.generatePublicPrivateKeyPair().then((keyPair: CryptoKeyPair) => {
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
    this.keysService.generatePublicPrivateKeyPair().then((keyPair: CryptoKeyPair) => {
      publicKey = keyPair.publicKey;
      this.privateKeyS = keyPair.privateKey;
      let sequence: Promise<any> = this.certificateRequestGenerationService
        .createPKCS10Internal(this.privateKeyS, publicKey, this.user).then((pkcs10Buffer) => {
          let pemRequest = this.certificateRequestGenerationService.parseCertificateRequestPEM(pkcs10Buffer);
          this._pemCertificationRequestS = pemRequest;
          this.certificateService.sign(pemRequest).subscribe((result: string) => {
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
}
