import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../domain/model/authentication/user";
import {KeysGenerationService} from "../../core/security-protocols/keys/keys-generation.service";
import {CertificateRequestGenerationService} from "../../core/security-protocols/certificates/certificates-requests-generation.service";
import {CryptographicOperations} from "../../core/security-protocols/cryptographic-operations/cryptographic-operations";
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
  private pemCertificate: string;
  private pemCertificationRequest: string;
  private password: string;

  private certificateGenerated: boolean = false;
  private passwordEntered: boolean = false;

  constructor(private route: ActivatedRoute, private keysGenerationService: KeysGenerationService,
              private certificateRequestGenerationService: CertificateRequestGenerationService,
              private certificateService: CertificateService,
              private cryptographicOperations: CryptographicOperations,
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
    this.passwordEntered = true;
  }

  public savePrivateKeyAndCertificateInDatabase() {
    this.securityProfileService.createSecurityProfile(this.pemCertificationRequest, this.pemCertificate,
      this.privateKey, this.password, this.user).subscribe((securityProfile: SecurityProfile) => {
        this.certificateService.save(securityProfile).subscribe((result: SecurityProfile) => console.log(result));
    });
  }

  private certificationRequest(): void {
    let publicKey: CryptoKey;
    this.keysGenerationService.generatePublicPrivateKeyPair().then((keyPair: CryptoKeyPair) => {
      publicKey = keyPair.publicKey;
      this.privateKey = keyPair.privateKey;
      let sequence: Promise<any> = this.certificateRequestGenerationService
        .createPKCS10Internal(this.privateKey, publicKey, this.user).then((pkcs10Buffer) => {
          let pemRequest = this.certificateRequestGenerationService.parsePEM(pkcs10Buffer);
          this.pemCertificationRequest = pemRequest;
          this.certificateService.sign(pemRequest).subscribe((result: string) => {
            console.log(result);
            this.pemCertificate = result;
            this.certificateGenerated = true;
          });
        }, error => Promise.reject(`Error parsing PKCS#10 into BER: ${error}`));
    });
  }

}
