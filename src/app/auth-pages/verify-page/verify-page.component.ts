import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../domain/model/authentication/user";
import {KeysService} from "../../core/security-protocols/keys/keys.service";
import {CertificateRequestGenerationService} from "../../core/security-protocols/certificates/certificates-requests-generation.service";
import {SecurityProfile} from "../../domain/model/security/security-profile";
import {CertificateService} from "../../domain/services/certificate/certificate.service";
import {SecurityProfileService} from "../../core/security-protocols/security-profile/security-profile.service";
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
  private privateKeyEncrypted: string;
  private _pemCertificate: string;
  private _pemCertificationRequest: string;
  private password: string;

  private certificateGenerated: boolean = false;
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
      this.certificationRequest();
    });
  }

  public passwordReady(password: string) {
    this.password = password;
    this.keysService.generateSymmetricKeyFromPassword(this.password, 6530, 32, 'SHA256')
      .then((symmetricKey: CryptoKey) => {
        this.keysService.encryptPrivateKeyWithSymmetricKey(this.privateKey, symmetricKey)
          .subscribe((encodedEncryptedPrivateKey: string) => {
            this.privateKeyEncrypted = encodedEncryptedPrivateKey;
            this.passwordEntered = true;
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
    let securityProfile;
    if (savePrivateKey) {
      securityProfile = this.securityProfileService.createSecurityProfile(this._pemCertificationRequest,
        this._pemCertificate, this.privateKeyEncrypted, this.password, this.user);
    } else {
      securityProfile = this.securityProfileService.createSecurityProfile(this._pemCertificationRequest,
        this._pemCertificate, undefined, this.password, this.user);
    }
    this.certificateService.save(securityProfile).subscribe((result: SecurityProfile) => console.log(result));
  }

  private certificationRequest(): void {
    let publicKey: CryptoKey;
    this.keysService.generatePublicPrivateKeyPair().then((keyPair: CryptoKeyPair) => {
      publicKey = keyPair.publicKey;
      this.privateKey = keyPair.privateKey;
      let sequence: Promise<any> = this.certificateRequestGenerationService
        .createPKCS10Internal(this.privateKey, publicKey, this.user).then((pkcs10Buffer) => {
          let pemRequest = this.certificateRequestGenerationService.parseCertificateRequestPEM(pkcs10Buffer);
          this._pemCertificationRequest = pemRequest;
          this.certificateService.sign(pemRequest).subscribe((result: string) => {
            this._pemCertificate = result;
            this.certificateGenerated = true;
          });
        }, error => Promise.reject(`Error parsing PKCS#10 into BER: ${error}`));
    });
  }

  get pemCertificate(): string {
    return this._pemCertificate;
  }

  get pemCertificationRequest(): string {
    return this._pemCertificationRequest;
  }
}
